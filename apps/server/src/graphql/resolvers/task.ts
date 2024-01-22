import taskV from "@/validators/task";
import { z } from "zod";
import { TaskModel } from "@/models/Task";
import { checkRequiredFields } from "@/utils/field";
import { checkAuthetication } from "@/utils/checkAuthetication";

export const query = {
  tasks: async (_parent, args: z.infer<typeof taskV.base>, context) => {
    const me = await context.getUser();
    checkAuthetication(me);
    const tasks = await TaskModel.find(args);
    return tasks;
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
