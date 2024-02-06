import { GraphQLObjectType } from "graphql";
import { nodeField, nodesField } from "./nodeType";
import { userQueries } from "../queries/userQueries";
import { clientQueries } from "../queries/clientQueries";
import { projectQueries } from "../queries/projectQueries";
import { taskQueries } from "../queries/taskQueries";
export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...clientQueries,
    ...projectQueries,
    ...taskQueries,
    node: nodeField,
    nodes: nodesField,
  },
});
