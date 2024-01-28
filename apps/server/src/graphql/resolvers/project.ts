import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import { ClientModel } from "@/models/Client";
import { checkRequiredFields } from "@/utils/field";
import projectV from "@/validators/project";
import { z } from "zod";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { doerCanDo } from "@/utils/doerCanDo";
import { TaskModel } from "@/models/Task";
import taskV from "@/validators/task";

const query = {
  projects: async (_parent, args: z.infer<typeof projectV.base>, context) => {
    checkAuthetication(context.getUser());
    const projects = await ProjectModel.find(args);
    return projects;
  },

  project: async (_parent, { id }: { id: string }, context) => {
    checkAuthetication(context.getUser());
    const project = await ProjectModel.findById(id);
    return project;
  },
};

const mutation = {
  createProject: async (_parent, { input }: { input: z.infer<typeof projectV.create> }, context) => {
    checkAuthetication(context.getUser());
    doerCanDo(context.getUser(), input.user);
    checkRequiredFields(input, projectV.create);
    const project = await ProjectModel.create(input);
    await UserModel.findByIdAndUpdate(input.user, { $push: { projects: project._id } });
    await ClientModel.findByIdAndUpdate(input.client, { $push: { projects: project._id } });
    return project;
  },

  updateProject: async (_parent, args: z.infer<typeof projectV.update>, context) => {
    checkRequiredFields(args, projectV.update);
    const project = await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
    if (!project) throw new Error("Project not found!");
    return project;
  },

  deleteProject: async (_parent, { id }: { id: string }, context) => {
    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) throw new Error("Project not found!");
    return "Project deleted successfully!";
  },
};

export const Project = {
  tasks: async (
    project: { id: string; user: string },
    args: { first: number; after: string; last: number; before: string; filter: z.infer<typeof taskV.filter> }
  ) => {
    if (!args.filter) args.filter = {};

    const { first = 10, after, last = 10, before, filter } = args;

    let tasks;
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (after) {
      tasks = await TaskModel.find({ project: project.id, _id: { $gt: after }, ...filter })
        .sort({ id: 1 })
        .limit(first + 1);

      hasNextPage = tasks.length > first;
      const previousTask = await TaskModel.findOne({
        project: project.id,
        _id: { $lt: tasks.length > 0 ? tasks[0]._id : after },
        ...filter,
      }).sort({
        _id: -1,
      });
      hasPreviousPage = !!previousTask;
      if (hasNextPage) tasks.pop();
    } else if (before) {
      tasks = await TaskModel.find({ project: project.id, _id: { $lt: before }, ...filter })
        .sort({ id: -1 })
        .limit(last + 1);
      hasPreviousPage = tasks.length > last;
      if (hasPreviousPage) tasks.pop();
      tasks = tasks.reverse();
      const nextTask = await TaskModel.findOne({
        project: project.id,
        _id: { $gt: tasks.length > 0 ? tasks[0]._id : before },
        ...filter,
      }).sort({
        _id: 1,
      });
      hasNextPage = !!nextTask;
    } else {
      tasks = await TaskModel.find({ project: project.id, ...filter })
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
};

export const projectResolvers = { query, mutation };
