import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { UserModel } from "@/models/User";
import { ProjectModel } from "@/models/Project";
import { ClientModel } from "@/models/Client";
import { TaskModel } from "@/models/Task";
import { projectType } from "./projectType";
import { clientType } from "./clientType";
import { taskType } from "./taskType";
import { userType } from "./userType";

export const { nodeInterface, nodesField, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === "User") {
      return await UserModel.findById(id);
    }
    if (type === "Project") {
      return await ProjectModel.findById(id);
    }
    if (type === "Client") {
      return await ClientModel.findById(id);
    }
    if (type === "Task") {
      return await TaskModel.findById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof UserModel) {
      return userType.name;
    }
    if (obj instanceof ProjectModel) {
      return projectType.name;
    }
    if (obj instanceof ClientModel) {
      return clientType.name;
    }
    if (obj instanceof TaskModel) {
      return taskType.name;
    }
    return null;
  }
);
