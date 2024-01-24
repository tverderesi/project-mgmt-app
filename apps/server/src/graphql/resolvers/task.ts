import taskV from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { checkRequiredFields } from "@/utils/field";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { Types } from "mongoose";
export const query = {
  tasks: async (
    _parent,
    args: { first: number; after: string; last: number; before: string; filter: z.infer<typeof taskV.filter> },
    context
  ) => {
    const me = await context.getUser();
    checkAuthetication(me);
    if (!args.filter) args.filter = {};
    if (me.role !== "ADMIN") args.filter.user = me.id;

    const { first = 10, after, last = 10, before, filter } = args;
    const afterId = after ? new Types.ObjectId(after) : null;
    const beforeId = before ? new Types.ObjectId(before) : null;

    let tasks;
    let hasNextPage = false;
    let hasPreviousPage = false;
    const taskCount = await TaskModel.find(filter).countDocuments();
    if (afterId) {
      tasks = await TaskModel.find({ _id: { $gt: afterId }, ...filter }).limit(first);
      hasNextPage = tasks.length > first;
    } else if (beforeId) {
      tasks = await TaskModel.find({ _id: { $lt: beforeId }, ...filter })
        .sort({ _id: -1 })
        .limit(last + 1);
      hasPreviousPage = tasks.length > last;
      tasks = tasks.reverse();
    } else {
      tasks = await TaskModel.find(filter).sort({ _id: 1 }).limit(first);
      hasNextPage = taskCount > first;
    }

    const edges = tasks.map((task) => ({
      cursor: task.id,
      node: task,
    }));

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
    };

    return { pageInfo, edges };
  },

  task: async (_parent, { id }: { id: string }, context) => {
    const me = await context.getUser();
    checkAuthetication(me);
    const task = await TaskModel.findById(id);
    if (!task) throw new Error("Task not found!");
    return task;
  },
};

export const mutation = {
  createTask: async (_parent, { input }: { input: z.infer<typeof taskV.create> }, context) => {
    console.log(input);
    const me = context.getUser();
    checkAuthetication(me);

    checkRequiredFields(input, taskV.create);
    const task = await TaskModel.create(input);
    return task;
  },

  updateTask: async (_parent, { input }: { input: z.infer<typeof taskV.update> }, context) => {
    const me = context.getUser();
    checkAuthetication(me);
    checkRequiredFields(input, taskV.update);
    const updatedTask = await TaskModel.findByIdAndUpdate(input.id, input, { new: true });
    return updatedTask;
  },

  deleteTask: async (_parent, { id }: { id: string }, context) => {
    const me = context.getUser();
    checkAuthetication(me);
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) throw new Error("Task not found!");
    return "Task deleted successfully!";
  },
};

export const taskResolvers = { mutation, query };
