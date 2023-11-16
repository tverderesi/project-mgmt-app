import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from "graphql";
import { GraphQLBuffer } from "./GraphQLBuffer";
import { ProjectType } from "./project";
import { ClientType } from "./client";
import ClientModel from "../../server/models/Client";
import ProjectModel from "../../server/models/Project";
export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    photo: { type: GraphQLBuffer },
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return ClientModel.find({ userId: parent.id });
      },
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectModel.find({ userId: parent.id });
      },
    },
  }),
});
