import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import { ClientModel } from "@/models/Client";
import { adminViewershipCheck, checkAuthentication, isCurrentUserOrAdmin } from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";
import projectV from "@/validators/project";
import { z } from "zod";

const query = {
  projects: async (_parent, args: z.infer<typeof projectV.query>, context) => {
    await checkAuthentication(context);
    await adminViewershipCheck(context, args);

    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
    if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");
    const projects = await ProjectModel.find(rest).limit(limit).skip(skip).sort(sort);

    return projects;
  },

  project: async (_parent, { id }: { id: string }, context) => {
    await checkAuthentication(context);

    const project = await ProjectModel.findById(id).populate("client");
    if (!project) throw new Error("Project not found!");

    return project;
  },

  deletedProjects: async (_parent: any, args: z.infer<typeof projectV.query>, context: any) => {
    await checkAuthentication(context);
    await adminViewershipCheck(context, args);

    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } = args;
    if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");

    const projects = await ProjectModel.find({ deletedAt: { $ne: null } })
      .limit(limit)
      .skip(skip);

    return projects;
  },
};

const mutation = {
  createProject: async (_parent: any, { input }: { input: z.infer<typeof projectV.create> }, context: any) => {
    await checkAuthentication(context);
    await adminViewershipCheck(context, input);

    checkRequiredFields(input, projectV.create);

    const project = await ProjectModel.create(input);

    await UserModel.findByIdAndUpdate(input.user, { $push: { projects: project._id } });
    await ClientModel.findByIdAndUpdate(input.client, { $push: { projects: project._id } });

    return project;
  },

  updateProject: async (_parent: any, args: z.infer<typeof projectV.update>, context: any) => {
    checkRequiredFields(args, projectV.update);

    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, args.id);

    const project = await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
    if (!project) throw new Error("Project not found!");

    return project;
  },

  deleteProject: async (_parent: any, { id }: { id: string }, context: any) => {
    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, id);

    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) throw new Error("Project not found!");

    return project;
  },

  restoreProject: async (_parent: any, { id }: { id: string }, context: any) => {
    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, id);

    const project = await ProjectModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
    if (!project) throw new Error("Project not found!");

    return project;
  },

  purgeProject: async (_parent: any, { id }: { id: string }, context: any) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, id);
      const project = await ProjectModel.findByIdAndDelete(id);
      if (!project) throw new Error("Project not found!");
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const projectResolvers = { query, mutation };
