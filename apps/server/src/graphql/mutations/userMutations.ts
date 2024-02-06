import { GraphQLEnumType, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userType } from "../schema/userType";
import { GraphQLBoolean } from "graphql";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { createErrorMessage } from "@/utils/createErrorMessage";
import { authError } from "@/utils/errors";
import { checkRequiredFields } from "@/utils/field";
import userV from "@/validators/user";
import { z } from "zod";
import { UserModel } from "@/models/User";
import bcrypt from "bcrypt";
import { invalidCredentials, userNotFound } from "@/utils/errors";
import { pruneEmptyValues } from "@/utils/field";
import { doerCanDo } from "@/utils/doerCanDo";
import { TreatMongoUniqueFieldsError } from "@/utils/field";
import { userRole } from "../schema/roleType";

const createUserMutation = mutationWithClientMutationId({
  name: "CreateUser",
  description:
    "Create a new user mutation. This mutation is used when a new user wishes to be registered on the website. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    confirmEmail: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(userRole) },
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: { type: userType },
  },
  mutateAndGetPayload: async ({ input }: { input: z.infer<typeof userV.create> }, context) => {
    const me = await context.getUser();

    checkRequiredFields(input, userV.create);

    if (me?.role !== "ADMIN" && input.role !== "USER") {
      const error = createErrorMessage(authError);
      throw new Error(error);
    }

    const user = await UserModel.create(input);
    return user;
  },
});

const updateUserMutation = mutationWithClientMutationId({
  name: "UpdateUser",
  description:
    "This mutation is used to update a user. An user with the 'USER' role can only edit his own profile, whereas an user with the 'ADMIN' role can edit any user.  The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: userRole },
  },
  outputFields: {
    user: { type: userType },
  },
  mutateAndGetPayload: async ({ input }: { input: z.infer<typeof userV.update> }, context: any) => {
    const me = await context.getUser();
    checkAuthetication(me);
    doerCanDo(me, input.id);
    checkRequiredFields(input, userV.update);

    const { id, oldPassword, ...rest } = input;
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        const error = createErrorMessage(userNotFound);
        throw new Error(error);
      }

      const decryptedPassword = await bcrypt.compare(oldPassword, user.password as string);
      if (!decryptedPassword) {
        const error = createErrorMessage(invalidCredentials);
        throw new Error(error);
      }

      //For some reason, Frontend is sending an empty string for some fields, so we need to prune them here.
      //TODO: investigate why this is happening on frontend
      pruneEmptyValues(rest);

      user.set(rest);
      await user.save();

      return user;
    } catch (e) {
      TreatMongoUniqueFieldsError(e);
      throw new Error(e);
    }
  },
});

const deleteUserMutation = mutationWithClientMutationId({
  name: "DeleteUser",
  description:
    "This mutation is used to delete a user. An user with the 'USER' role can only delete his own profile, whereas an user with the 'ADMIN' role can delete any user.  The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    success: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async ({ id }: { id: string }, context: any) => {
    const me = await context.getUser();
    checkAuthetication(me);
    doerCanDo(me, id);
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      const error = createErrorMessage(userNotFound);
      throw new Error(error);
    }
    if (me.id == id) await context.logout();
    return { success: true };
  },
});

export const userMutations = { createUser: createUserMutation, updateUser: updateUserMutation, deleteUser: deleteUserMutation };
