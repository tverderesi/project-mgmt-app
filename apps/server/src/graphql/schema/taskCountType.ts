import user from "@/validators/user";
import { GraphQLInt, GraphQLObjectType } from "graphql";
export const taskCountType = new GraphQLObjectType({
  name: "TaskCount",
  fields: {
    TOTAL: { type: GraphQLInt },
    COMPLETED: { type: GraphQLInt },
    NOT_STARTED: { type: GraphQLInt },
    IN_PROGRESS: { type: GraphQLInt },
  },
});
