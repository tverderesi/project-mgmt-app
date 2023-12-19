import { createTaskValidator, taskValidator, updateTaskValidator } from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { adminViewershipCheck, checkAuthentication, isCurrentUserOrAdmin } from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";

//TODO: Implement logic where if the user where to move a task to another project, the user must be a member of that project.

export const query = {
  tasks: async (_parent: any, args: z.infer<typeof taskValidator>, context: any) => {
    try {
      adminViewershipCheck(context, args);
      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
      if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");
      const tasks = await TaskModel.find(rest).limit(limit).skip(skip).sort(sort);
      return tasks;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  task: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      checkAuthentication(context);
      const task = await TaskModel.findById(_id);
      if (!task) throw new Error("Task not found!");
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const mutation = {
  createTask: async (_parent: any, args: z.infer<typeof createTaskValidator>, context: any) => {
    try {
      checkAuthentication(context);
      isCurrentUserOrAdmin(context, args.userId);
      checkRequiredFields(args, createTaskValidator);
      const task = await TaskModel.create(args);
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateTask: async (_parent: any, args: z.infer<typeof updateTaskValidator>, context: any) => {
    try {
      checkAuthentication(context);
      isCurrentUserOrAdmin(context, args.userId);
      const updatedTask = await TaskModel.findByIdAndUpdate(args._id, args, { new: true });
      return updatedTask;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteTask: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      checkAuthentication(context);
      const task = await TaskModel.findByIdAndUpdate(_id, { deletedAt: new Date() }, { new: true });
      if (!task) throw new Error("Task not found!");
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  restoreTask: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      checkAuthentication(context);
      const task = await TaskModel.findByIdAndUpdate(_id, { deletedAt: null }, { new: true });
      if (!task) throw new Error("Task not found!");
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  purgeTask: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      checkAuthentication(context);
      const task = await TaskModel.findByIdAndDelete(_id);
      if (!task) throw new Error("Task not found!");
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const taskResolvers = { mutation, query };
