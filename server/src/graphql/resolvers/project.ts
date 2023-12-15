import { ProjectModel } from "@/models/Project";
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

  project: async (parent: any, { _id }: { _id: string }, context) => {
    try {
      await checkAuthentication(context);

      const project = await ProjectModel.findById(_id);

      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
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
  createProject: async (_parent: any, args: z.infer<typeof createProjectValidator>, context: any) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);

      checkRequiredFields(args, createProjectValidator);

      const project = await ProjectModel.create(args);
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProject: async (_parent: any, args: z.infer<typeof updateProjectValidator>, context: any) => {
    try {
      checkRequiredFields(args, updateProjectValidator);

      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, args._id);

      const project = await ProjectModel.findByIdAndUpdate(args._id, args, { new: true });
      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProject: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);
      const project = await ProjectModel.findByIdAndDelete(_id);
      if (!project) throw new Error("Project not found!");
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  restoreProject: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);
      const project = await ProjectModel.findByIdAndUpdate(_id, { deletedAt: null }, { new: true });

      if (!project) throw new Error("Project not found!");

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  purgeProject: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);
      const project = await ProjectModel.findByIdAndDelete(_id);
      if (!project) throw new Error("Project not found!");
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const projectResolvers = { query, mutation };
