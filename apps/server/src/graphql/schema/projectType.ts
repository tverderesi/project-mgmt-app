import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField, connectionArgs } from "graphql-relay";
import { UserModel } from "@/models/User";
import { Project } from "@/models/Project";
import { ClientModel } from "@/models/Client";
import { userType } from "./userType";
import { clientType } from "./clientType";
import { nodeInterface } from "./nodeType";
import { taskConnection } from "./taskType";
import { resolveTasksInProject } from "../resolvers/resolveTasksInProject";

export const projectType = new GraphQLObjectType<Project, any>({
  name: "Project",
  description: "Represents a Project in the system. A project contains tasks that a user has to do.",
  fields: () => ({
    id: globalIdField("Project"),
    name: { type: GraphQLString, resolve: (project) => project.name },
    description: { type: GraphQLString, resolve: (project) => project.description },
    status: { type: GraphQLString, resolve: (project) => project.status },
    client: {
      type: clientType,
      resolve: async (project) => {
        const client = await ClientModel.findById(project.client);
        return client;
      },
    },
    user: {
      type: userType,
      resolve: async (project) => {
        const user = await UserModel.findById(project.user);
        return user;
      },
    },
    taskEdge: {
      type: new GraphQLNonNull(taskConnection.connectionType),
      args: connectionArgs,
      resolve: resolveTasksInProject,
    },

    createdAt: { type: GraphQLString, resolve: (project) => project.createdAt },
    updatedAt: { type: GraphQLString, resolve: (project) => project.updatedAt },
  }),
  interfaces: () => [nodeInterface],
});

export const projectConnection = connectionDefinitions({
  name: "Project",
  nodeType: projectType,
});
