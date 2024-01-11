import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import { ClientModel } from "@/models/Client";
import { checkRequiredFields } from "@/utils/field";
import projectV from "@/validators/project";
import { z } from "zod";

const query = {
  projects: async (_parent, args: z.infer<typeof projectV.query>, context) => {
    console.log(args);
    const projects = await ProjectModel.find(args);
    return projects;
  },

  project: async (_parent, { id }: { id: string }, context) => {
    const project = await ProjectModel.findById(id).populate("client");
    return project;
  },
};

const mutation = {
  createProject: async (_parent, { input }: { input: z.infer<typeof projectV.create> }, context) => {
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
