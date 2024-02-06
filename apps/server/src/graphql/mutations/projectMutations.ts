import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userType } from "../schema/userType";
import { GraphQLBoolean } from "graphql";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { createErrorMessage } from "@/utils/createErrorMessage";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
import { UserModel } from "@/models/User";
import { projectNotFound } from "@/utils/errors";
import { doerCanDo } from "@/utils/doerCanDo";
import { ProjectModel } from "@/models/Project";
import { ClientModel } from "@/models/Client";
import projectV from "@/validators/project";
import { TaskModel } from "@/models/Task";
import { projectStatusType } from "../schema/projectStatusType";
import { projectType } from "../schema/projectType";

const createProjectMutation = mutationWithClientMutationId({
  name: "CreateProject",
  description:
    "Creates a new project. This mutation is used when a new user wishes to add a project to their account. An user with the USER role can only create projects for themselves, whereas an user with ADMIN role can create for any user in the database. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    client: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: projectStatusType,
    },
  },
  outputFields: {
    project: { type: projectType },
  },
  mutateAndGetPayload: async ({ input }: { input: z.infer<typeof projectV.create> }, context) => {
    checkAuthetication(context.getUser());
    doerCanDo(context.getUser(), input.user);
    checkRequiredFields(input, projectV.create);
    const project = await ProjectModel.create(input);
    await UserModel.findByIdAndUpdate(input.user, { $push: { projects: project._id } });
    await ClientModel.findByIdAndUpdate(input.client, { $push: { projects: project._id } });
    return project;
  },
});

const updateProjectMutation = mutationWithClientMutationId({
  name: "UpdateProject",
  description:
    "This mutation is used to update a project. An user with the 'USER' role can only edit his own projects, whereas an user with the 'ADMIN' role can edit a project from any user. The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    project: { type: projectType },
  },
  mutateAndGetPayload: async (_parent, args: z.infer<typeof projectV.update>, context) => {
    checkRequiredFields(args, projectV.update);
    const project = await ProjectModel.findByIdAndUpdate(args.id, args, { new: true });
    if (!project) throw new Error("Project not found!");
    return project;
  },
});

const deleteProjectMutation = mutationWithClientMutationId({
  name: "DeleteProject",
  description:
    "This mutation is used to delete a project. An user with the 'USER' role can only delete one of their own projects, whereas an user with the 'ADMIN' role can delete a project from any user.  The clientMutationId is how Relay keeps track of the mutations.",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    deleteTasks: { type: GraphQLBoolean, defaultValue: false },
  },
  outputFields: {
    success: { type: GraphQLBoolean },
  },
  mutateAndGetPayload: async ({ id, deleteTasks }: { id: string; deleteTasks: boolean }, context) => {
    const project = await ProjectModel.findById(id);
    await ProjectModel.findByIdAndDelete(id);
    await UserModel.findByIdAndUpdate(project?.user, { $pull: { projects: id } });
    if (deleteTasks) {
      await TaskModel.deleteMany({ project: id });
    }
    if (!deleteTasks) {
      await TaskModel.updateMany({ project: id }, { project: null });
    }

    if (!project) {
      const error = createErrorMessage(projectNotFound);
      throw new Error(error);
    }
    return { success: true };
  },
});

export const projectMutations = {
  createProject: createProjectMutation,
  updateProject: updateProjectMutation,
  deleteProject: deleteProjectMutation,
};
