import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import { ClientModel } from "@/models/Client";
import { checkRequiredFields } from "@/utils/field";
import projectV from "@/validators/project";
import { z } from "zod";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { doerCanDo } from "@/utils/doerCanDo";
import { TaskModel } from "@/models/Task";

const query = {
  projects: async (
    _parent,
    args: {
      first: number;
      after: string;
      last: number;
      before: string;
      filter: z.infer<typeof projectV.filter>;
    },
    context
  ) => {
    const me = await context.getUser();
    checkAuthetication(me);
    if (!args.filter) args.filter = {};
    if (me.role !== "ADMIN") args.filter.user = me.id;
    const { first = 10, after, last = 10, before, filter } = args;

    let projects;
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (after) {
      projects = await ProjectModel.find({ _id: { $gt: after }, ...filter })
        .sort({ id: 1 })
        .limit(first + 1);

      hasNextPage = projects.length > first;
      const previousProject = await ProjectModel.findOne({
        _id: { $lt: projects.length > 0 ? projects[0]._id : after },
        ...filter,
      }).sort({
        _id: -1,
      });
      hasPreviousPage = !!previousProject;
    } else if (before) {
      projects = await ProjectModel.find({ _id: { $lt: before }, ...filter })
        .sort({ id: -1 })
        .limit(last + 1);
      hasPreviousPage = projects.length > last;
      if (hasPreviousPage) projects.pop();
      projects = projects.reverse();
      const nextProject = await ProjectModel.findOne({
        _id: { $gt: projects.length > 0 ? projects[0]._id : before },
        ...filter,
      }).sort({
        _id: 1,
      });
      hasNextPage = !!nextProject;
    } else {
      projects = await ProjectModel.find(filter)
        .sort({ _id: 1 })
        .limit(first + 1);
      hasNextPage = projects.length > first;
      if (hasNextPage) projects.pop();
    }

    const edges = projects.map((project) => ({
      cursor: project.id,
      node: project,
    }));

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return { pageInfo, edges };
  },

  project: async (_parent, { id }: { id: string }, context) => {
    checkAuthetication(context.getUser());
    const project = await ProjectModel.findById(id);
    const client = await ClientModel.findById(project?.client);
    const tasks = await TaskModel.find({ project: id });
    return { ...project?.toObject(), client, tasks };
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

export const projectResolvers = { query, mutation };
