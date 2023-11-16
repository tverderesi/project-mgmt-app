import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { ProjectType } from "./project";
import ProjectModel from "@/models/Project";

//Defining a Client Type
export const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectModel.find({ clientId: parent.id });
      },
    },
  }),
});
