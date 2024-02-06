import { ClientModel } from "@/models/Client";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { clientType } from "../schema/clientType";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { User } from "@/models/User";
import { fromGlobalId } from "graphql-relay";
import { TaskModel } from "@/models/Task";
import { taskType } from "../schema/taskType";

export const taskQueries = {
  tasks: {
    name: "Tasks",
    description: "This query returns all the tasks in the system. It is not yet paginated or filtered.",
    type: new GraphQLList(taskType),
    resolve: async (_, args) => {
      const tasks = await TaskModel.find();
      return tasks;
    },
  },
  task: {
    name: "Task",
    description: "This query returns a task by its ID.",
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: taskType,
    resolve: async (_, args, context: any) => {
      const me = context.getUser() as User;
      checkAuthetication(me);
      const { id } = fromGlobalId(args.id);
      const task = await TaskModel.findById(id);
      return task;
    },
  },
};
