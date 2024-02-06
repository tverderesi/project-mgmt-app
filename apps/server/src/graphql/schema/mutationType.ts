import { GraphQLObjectType } from "graphql";
import { authMutations } from "../mutations/authMutations";
import { userMutations } from "../mutations/userMutations";
import { projectMutations } from "../mutations/projectMutations";
import { clientMutations } from "../mutations/clientMutations";
import { taskMutations } from "../mutations/taskMutations";
export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutations,
    ...userMutations,
    ...projectMutations,
    ...clientMutations,
    ...taskMutations,
  },
});
