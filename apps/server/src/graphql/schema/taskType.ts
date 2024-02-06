import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { UserModel } from "@/models/User";
import { ProjectModel } from "@/models/Project";
import { Task } from "@/models/Task";
import { projectType } from "./projectType";
import { userType } from "./userType";
import { nodeInterface } from "./nodeType";
import { taskStatusType } from "./taskStatusType";

export const taskType = new GraphQLObjectType<Task, any>({
  name: "Task",
  description: "Represents a Task in the system. A task is something that a user has to do.",
  fields: () => ({
    id: globalIdField("Task"),
    title: { type: GraphQLString, resolve: (task) => task.title },
    description: { type: GraphQLString, resolve: (task) => task.description },
    project: {
      type: projectType,
      resolve: async (task) => {
        const project = await ProjectModel.findById(task.project);
        return project;
      },
    },
    user: {
      type: userType,
      resolve: async (task) => {
        const user = await UserModel.findById(task.user);
        return user;
      },
    },
    status: { type: taskStatusType, resolve: (task) => task.status },

    createdAt: { type: GraphQLString, resolve: (task) => task.createdAt },
    updatedAt: { type: GraphQLString, resolve: (task) => task.updatedAt },
  }),
  interfaces: () => [nodeInterface],
});

export const taskConnection = connectionDefinitions({
  name: "Task",
  nodeType: taskType,
});
