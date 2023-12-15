import { ProjectModel } from "@/models/Project";
import { adminViewershipCheck, checkAuthentication, isCurrentUserOrAdmin } from "@/utils/auth";
import {
  projectValidator,
  createProjectValidator,
  updateProjectValidator,
} from "@/validators/project";
import { z } from "zod";

const query = {
  projects: async (parent: any, args: Partial<z.infer<typeof projectValidator>>, context) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);
      const {
        skip = Number(process.env.DEFAULT_SKIP),
        limit = Number(process.env.DEFAULT_LIMIT),
        sort,
        ...rest
      } = args;
      if (skip === undefined || !limit)
        throw new Error("Skip and limit are required on the environment variables!");

      const projects = await ProjectModel.find(rest).limit(limit).skip(skip).sort(sort);

      return projects;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  project: async (parent: any, { _id }: { _id: string }, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);
      const project = await ProjectModel.findById(_id);
      if (!project) throw new Error("Project not found!");
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const mutation = {
  createProject: async (parent: any, args: Partial<z.infer<typeof projectValidator>>, context) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);
      const project = await ProjectModel.create(args);
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateProject: async (
    parent: any,
    args: Partial<z.infer<typeof updateProjectValidator>>,
    context
  ) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, args._id);
      const project = await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
      if (!project) throw new Error("Project not found!");
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteProject: async (parent: any, { _id }: { _id: string }, context) => {
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
