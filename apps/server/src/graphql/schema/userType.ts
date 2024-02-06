import { GraphQLEnumType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionArgs, connectionDefinitions, fromGlobalId, globalIdField } from "graphql-relay";
import { User } from "@/models/User";
import { projectConnection } from "./projectType";
import { clientConnection, clientType } from "./clientType";
import { nodeInterface } from "./nodeType";
import { resolveProjectsInUser } from "../resolvers/resolveProjectsInUser";
import { resolveClientsInUser } from "../resolvers/resolverClientsInUser";
import { userRole } from "./roleType";
import { taskCountType } from "./taskCountType";
import { TaskModel } from "@/models/Task";
import { ClientModel } from "@/models/Client";
import { ProjectModel } from "@/models/Project";

export const userType = new GraphQLObjectType<User, any>({
  name: "User",
  description: "Represents a User in the system.",
  fields: () => ({
    id: globalIdField("User"),
    role: { type: new GraphQLNonNull(userRole), resolve: (user) => user.role },
    name: { type: GraphQLString, resolve: (user) => user.name },
    email: { type: GraphQLString, resolve: (user) => user.email },
    username: { type: GraphQLString, resolve: (user) => user.username },
    clientEdge: {
      type: new GraphQLNonNull(clientConnection.connectionType),
      args: connectionArgs,
      resolve: resolveClientsInUser,
    },
    projects: {
      type: new GraphQLNonNull(projectConnection.connectionType),
      args: connectionArgs,
      resolve: resolveProjectsInUser,
    },
    taskCount: {
      type: new GraphQLNonNull(taskCountType),
      resolve: async (user) => {
        const taskCount = await TaskModel.aggregate([
          {
            $match: {
              user: user.id,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              COMPLETED: {
                $sum: {
                  $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0],
                },
              },
              NOT_STARTED: {
                $sum: {
                  $cond: [{ $eq: ["$status", "NOT_STARTED"] }, 1, 0],
                },
              },
              IN_PROGRESS: {
                $sum: {
                  $cond: [{ $eq: ["$status", "IN_PROGRESS"] }, 1, 0],
                },
              },
            },
          },
        ]);
        return { TOTAL: 0, NOT_STARTED: 0, IN_PROGRESS: 0, COMPLETED: 0 };
      },
    },
    clientCount: {
      type: GraphQLInt,
      resolve: async (user) => {
        return await ClientModel.countDocuments({ user: user.id });
      },
    },
    projectCount: {
      type: GraphQLInt,
      resolve: async (user) => {
        return await ProjectModel.countDocuments({ user: user.id });
      },
    },
    password: { type: GraphQLString, resolve: (user) => user.password },
    createdAt: { type: GraphQLString, resolve: (user) => user.createdAt },
    updatedAt: { type: GraphQLString, resolve: (user) => user.updatedAt },
  }),
  interfaces: () => [nodeInterface],
});

export const userConnection = connectionDefinitions({
  name: "User",
  nodeType: userType,
});
