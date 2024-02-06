import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean } from "graphql";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { createErrorMessage } from "@/utils/createErrorMessage";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
import { UserModel } from "@/models/User";
import { projectNotFound } from "@/utils/errors";
import { doerCanDo } from "@/utils/doerCanDo";
import { ProjectModel } from "@/models/Project";
import taskV from "@/validators/task";
import { TaskModel } from "@/models/Task";
import { taskStatusType } from "../schema/taskStatusType";
import { taskConnection, taskType } from "../schema/taskType";

const createTaskMutation = mutationWithClientMutationId({
  name: "CreateTask",
  description:
    "Creates a new task. This mutation is used when a new user wishes to add a task to a project that belongs to their account. An user with the USER role can only create tasks for themselves, whereas an user with ADMIN role can create them for any user in the database. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    project: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: taskStatusType,
    },
  },
  outputFields: {
    taskEdge: { type: taskConnection.edgeType },
  },
  mutateAndGetPayload: async (input: z.infer<typeof taskV.create>, context) => {
    checkAuthetication(context.getUser());
    input.user = fromGlobalId(input.user).id;
    input.project = fromGlobalId(input.project).id;
    doerCanDo(context.getUser(), input.user);
    checkRequiredFields(input, taskV.create);

    const task = await TaskModel.create(input);

    await UserModel.findByIdAndUpdate(input.user, { $push: { tasks: task._id } });
    await ProjectModel.findByIdAndUpdate(input.project, { $push: { tasks: task._id } });
    const taskEdge = {
      cursor: task.id,
      node: task,
    };
    return {
      taskEdge,
    };
  },
});

const updateTaskMutation = mutationWithClientMutationId({
  name: "UpdateTask",
  description:
    "This mutation is used to update a Tasker with the 'USER' role can only edit his own tasks, whereas an user with the 'ADMIN' role can edit a task from any user. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    project: { type: GraphQLString },
    user: { type: GraphQLString },
    status: {
      type: taskStatusType,
    },
  },
  outputFields: {
    taskEdge: { type: taskConnection.edgeType },
  },
  mutateAndGetPayload: async (_parent, args: z.infer<typeof taskV.update>, context) => {
    checkRequiredFields(args, taskV.update);
    const task = await TaskModel.findByIdAndUpdate(args.id, args, { new: true });
    if (!task) throw new Error("Task not found!");
    const taskEdge = {
      cursor: task.id,
      node: task,
    };
    return {
      taskEdge,
    };
  },
});

const deleteTaskMutation = mutationWithClientMutationId({
  name: "DeleteTask",
  description:
    "This mutation is used to delete a task. An user with the 'USER' role can only delete one of their own tasks, whereas an user with the 'ADMIN' role can delete a task from any user.  The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    taskEdge: { type: taskConnection.edgeType },
  },
  mutateAndGetPayload: async ({ id }: { id: string }, context) => {
    const me = context.getUser();

    checkAuthetication(me);

    const { id: taskId } = fromGlobalId(id);
    const task = await TaskModel.findById(taskId);
    await TaskModel.findByIdAndDelete(taskId);
    await UserModel.findByIdAndUpdate(task?.user, { $pull: { tasks: taskId } });
    await ProjectModel.findByIdAndUpdate(task?.project, { $pull: { tasks: taskId } });
    if (!task) {
      const error = createErrorMessage(projectNotFound);
      throw new Error(error);
    }
    console.log(task, "task");
    return {
      taskEdge: {
        cursor: task.id,
        node: task,
      },
    };
  },
});

export const taskMutations = {
  createTask: createTaskMutation,
  updateTask: updateTaskMutation,
  deleteTask: deleteTaskMutation,
};
