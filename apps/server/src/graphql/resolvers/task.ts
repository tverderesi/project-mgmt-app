import taskV from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { adminViewershipCheck, checkAuthentication, isCurrentUserOrAdmin } from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";

//TODO: Implement logic where if the user where to move a task to another project, the user must be a member of that project.

export const query = {
  tasks: async (_parent, args: z.infer<typeof taskV.query>, context) => {
    adminViewershipCheck(context, args);

    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
    if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");

    const tasks = await TaskModel.find(rest).limit(limit).skip(skip).sort(sort);

    return tasks;
  },

  task: async (_parent, { id }: { id: string }, context) => {
    checkAuthentication(context);

    const task = await TaskModel.findById(id);
    if (!task) throw new Error("Task not found!");

    return task;
  },
};

export const mutation = {
  createTask: async (_parent, args: z.infer<typeof taskV.create>, context) => {
    checkAuthentication(context);
    isCurrentUserOrAdmin(context, args.user);
    checkRequiredFields(args, taskV.create);

    const task = await TaskModel.create(args);

    return task;
  },

  updateTask: async (_parent, args: z.infer<typeof taskV.update>, context) => {
    checkAuthentication(context);
    isCurrentUserOrAdmin(context, args.user);

    const updatedTask = await TaskModel.findByIdAndUpdate(args.id, args, { new: true });

    return updatedTask;
  },

  deleteTask: async (_parent, { id }: { id: string }, context) => {
    checkAuthentication(context);

    const task = await TaskModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (!task) throw new Error("Task not found!");

    return task;
  },

  restoreTask: async (_parent, { _id }: { _id: string }, context) => {
    checkAuthentication(context);

    const task = await TaskModel.findByIdAndUpdate(_id, { deletedAt: null }, { new: true });
    if (!task) throw new Error("Task not found!");

    return task;
  },

  purgeTask: async (_parent, { id }: { id: string }, context) => {
    checkAuthentication(context);

    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) throw new Error("Task not found!");

    return task;
  },
};

export const taskResolvers = { mutation, query };
