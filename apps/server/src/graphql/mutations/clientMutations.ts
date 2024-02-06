import { GraphQLEnumType, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userType } from "../schema/userType";
import { GraphQLBoolean } from "graphql";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { createErrorMessage } from "@/utils/createErrorMessage";
import { checkRequiredFields } from "@/utils/field";
import userV from "@/validators/user";
import { z } from "zod";
import { UserModel } from "@/models/User";
import { clientNotFound } from "@/utils/errors";
import { doerCanDo } from "@/utils/doerCanDo";
import { ProjectModel } from "@/models/Project";
import { ClientModel } from "@/models/Client";
import clientV from "@/validators/client";
import { TaskModel } from "@/models/Task";
import { clientType } from "../schema/clientType";

const createClientMutation = mutationWithClientMutationId({
  name: "CreateClient",
  description:
    "Creates a new client. This mutation is used when a new user wishes to add a client to their account. An user with the USER role can only create clients for themselves, whereas an use with the ADMIN role can create a client for any user in the database. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    user: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    client: { type: clientType },
  },
  mutateAndGetPayload: async ({ input }: { input: z.infer<typeof clientV.create> }, context) => {
    const me = context.getUser();
    checkAuthetication(me);
    doerCanDo(me, input.user);
    checkRequiredFields(input, clientV.create);
    const client = await ClientModel.create(input);
    await UserModel.findByIdAndUpdate(input.user, { $push: { projects: client._id } });
    return client;
  },
});

const updateClienttMutation = mutationWithClientMutationId({
  name: "UpdateClient",
  description:
    "This mutation is used to update a client. An user with the 'USER' role can only edit his own clients, whereas a user with the 'ADMIN' role can edit a client from any user. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    user: { type: GraphQLString },
  },
  outputFields: {
    client: { type: clientType },
  },
  mutateAndGetPayload: async ({ input }: { input: z.infer<typeof clientV.update> }, context) => {
    const me = context.getUser();

    if (input.user) {
      doerCanDo(me, input.user);
    }

    const { id, ...rest } = input;

    const updatedClient = ClientModel.findByIdAndUpdate(id, rest, { new: true });
    if (!updatedClient) {
      const error = createErrorMessage(clientNotFound);
      throw new Error(error);
    }
    return updatedClient;
  },
});

const deleteClientMutation = mutationWithClientMutationId({
  name: "DeleteClient",
  description:
    "This mutation is used to delete a client. An user with the 'USER' role can only delete one of his own clients, whereas an user with the 'ADMIN' role can delete a client from any user.  The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    deleteProjects: { type: GraphQLBoolean, defaultValue: false },
  },
  outputFields: {
    success: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async ({ id, deleteProjects }: { id: string; deleteProjects: boolean }, context) => {
    const me = context.getUser();
    checkAuthetication(me);
    if (me.role !== "ADMIN") {
      doerCanDo(me, id);
    }

    const client = await ClientModel.findById(id);

    await UserModel.findByIdAndUpdate(client?.user, { $pull: { clients: id } });

    if (deleteProjects) {
      const projects = await ProjectModel.find({ client: id });
      await ProjectModel.deleteMany({ client: id });
      await TaskModel.deleteMany({ project: { $in: projects.map((p) => p._id) } });
    }

    if (!deleteProjects) {
      await ProjectModel.updateMany({ client: id }, { client: null });
    }

    return { success: true };
  },
});

export const clientMutations = {
  createClient: createClientMutation,
  updateClient: updateClienttMutation,
  deleteClient: deleteClientMutation,
};
