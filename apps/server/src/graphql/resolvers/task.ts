import taskV from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { checkRequiredFields } from "@/utils/field";

export const query = {
  tasks: async (_parent, args: z.infer<typeof taskV.query>, context) => {
    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
    const tasks = await TaskModel.find(rest).limit(limit).skip(skip).sort(sort);
    return tasks;
  },

  task: async (_parent, { id }: { id: string }, context) => {
    const task = await TaskModel.findById(id);
    if (!task) throw new Error("Task not found!");
    return task;
  },
};

export const mutation = {
  createTask: async (_parent, args: z.infer<typeof taskV.create>, context) => {
    checkRequiredFields(args, taskV.create);
    const task = await TaskModel.create(args);
    return task;
  },

  updateTask: async (_parent, args: z.infer<typeof taskV.update>, context) => {
    checkRequiredFields(args, taskV.update);
    const updatedTask = await TaskModel.findByIdAndUpdate(args.id, args, { new: true });
    return updatedTask;
  },

  deleteTask: async (_parent, { id }: { id: string }, context) => {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) throw new Error("Task not found!");
    return "Task deleted successfully!";
  },
};

export const taskResolvers = { mutation, query };
