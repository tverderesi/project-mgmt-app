import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import { ClientModel } from "@/models/Client";
import { adminViewershipCheck, checkAuthentication, isCurrentUserOrAdmin } from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";
import { projectValidator, createProjectValidator, updateProjectValidator } from "@/validators/project";
import { z } from "zod";

const query = {
  projects: async (_parent: any, args: z.infer<typeof projectValidator>, context: any) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);

      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
      if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");

      const projects = await ProjectModel.find(rest).limit(limit).skip(skip).sort(sort);

      return projects;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  project: async (parent: any, { id }: { id: string }, context) => {
    try {
      await checkAuthentication(context);
      console.log(id);
      const project = await ProjectModel.findById(id).populate("client");
      console.log(project);
      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  deletedProjects: async (_parent: any, args: z.infer<typeof projectValidator>, context: any) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);

      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } = args;
      if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");

      const projects = await ProjectModel.find({ deletedAt: { $ne: null } })
        .limit(limit)
        .skip(skip);

      return projects;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const mutation = {
  createProject: async (_parent: any, { input }: { input: z.infer<typeof createProjectValidator> }, context: any) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, input);

      checkRequiredFields(input, createProjectValidator);

      const project = await ProjectModel.create(input);
      await UserModel.findByIdAndUpdate(input.user, { $push: { projects: project._id } });
      await ClientModel.findByIdAndUpdate(input.client, { $push: { projects: project._id } });
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProject: async (_parent: any, args: z.infer<typeof updateProjectValidator>, context: any) => {
    try {
      checkRequiredFields(args, updateProjectValidator);

      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, args.id);

      const project = await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProject: async (_parent: any, { id }: { id: string }, context: any) => {
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

  restoreProject: async (_parent: any, { id }: { id: string }, context: any) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, id);
      const project = await ProjectModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true });

      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
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
