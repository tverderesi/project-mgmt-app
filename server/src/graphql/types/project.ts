import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from "graphql";
import ClientModel from "@/models/Client";
import { ClientType } from "./client";

//Defining a Project Type
export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    progress: { type: GraphQLInt },
    client: {
      type: ClientType,
      resolve(parent: any, args: any) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});
