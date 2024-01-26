import taskV from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { checkRequiredFields } from "@/utils/field";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { viewerCanView } from "@/utils/viewerCanView";

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

    let tasks;
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (after) {
      tasks = await TaskModel.find({ _id: { $gt: after }, ...filter })
        .sort({ id: 1 })
        .limit(first + 1);

      hasNextPage = tasks.length > first;
      const previousTask = await TaskModel.findOne({ _id: { $lt: tasks.length > 0 ? tasks[0]._id : after }, ...filter }).sort({
        _id: -1,
      });
      hasPreviousPage = !!previousTask;
      if (hasNextPage) tasks.pop();
    } else if (before) {
      tasks = await TaskModel.find({ _id: { $lt: before }, ...filter })
        .sort({ id: -1 })
        .limit(last + 1);
      hasPreviousPage = tasks.length > last;
      if (hasPreviousPage) tasks.pop();
      tasks = tasks.reverse();
      const nextTask = await TaskModel.findOne({ _id: { $gt: tasks.length > 0 ? tasks[0]._id : before }, ...filter }).sort({
        _id: 1,
      });
      hasNextPage = !!nextTask;
    } else {
      tasks = await TaskModel.find(filter)
        .sort({ _id: 1 })
        .limit(first + 1);
      hasNextPage = tasks.length > first;
      if (hasNextPage) tasks.pop();
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

  taskCountByStatus: async (_parent, { user }: { user: string }, context) => {
    const me = await context.getUser();
    checkAuthetication(me);
    viewerCanView(user, me);

    const [NOT_STARTED, IN_PROGRESS, COMPLETED] = await Promise.all([
      TaskModel.countDocuments({ user, status: "NOT_STARTED" }),
      TaskModel.countDocuments({ user, status: "IN_PROGRESS" }),
      TaskModel.countDocuments({ user, status: "COMPLETED" }),
    ]);

    const TOTAL = NOT_STARTED + IN_PROGRESS + COMPLETED;
    return { NOT_STARTED, IN_PROGRESS, COMPLETED, TOTAL };
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
