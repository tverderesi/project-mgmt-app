import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userType } from "../schema/userType";
import { GraphQLBoolean } from "graphql";
import { User } from "@/models/User";
import { checkAuthetication } from "@/utils/checkAuthetication";

const loginMutation = mutationWithClientMutationId({
  name: "Login",
  description: "Login mutation. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    user: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: { type: userType },
  },
  mutateAndGetPayload: async ({ user: username, password }, context) => {
    const loggedUser = await context.authenticate("graphql-local", {
      username,
      password,
    });

    await context.login(loggedUser);
    return loggedUser;
  },
});

const logoutMutation = mutationWithClientMutationId({
  name: "Logout",
  description: "Logout mutation. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {},
  outputFields: {
    success: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async (_, context) => {
    const me = context.getUser() as User;
    checkAuthetication(me);
    await context.logout();
    return { success: true };
  },
});

export const authMutations = { login: loginMutation, logout: logoutMutation };
