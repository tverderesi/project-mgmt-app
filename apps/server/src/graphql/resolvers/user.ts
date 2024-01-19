import { UserModel } from "@/models/User";
import userV from "@/validators/user";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createErrorMessage } from "../../utils/createErrorMessage";
import { TreatMongoUniqueFieldsError } from "@/utils/field";
import { doerCanDo } from "../../utils/doerCanDo";
import { checkAuthetication } from "../../utils/checkAuthetication";
import { pruneEmptyValues } from "@/utils/field";
import { authError, invalidCredentials, userNotFound } from "@/utils/errors";
import { viewerCanView } from "@/utils/viewerCanView";
import { ProjectModel } from "@/models/Project";
import { ClientModel } from "@/models/Client";

const mutation = {
  createUser: async (_parent: any, { input }: { input: z.infer<typeof userV.create> }, context: any) => {
    const me = await context.getUser();

    checkRequiredFields(input, userV.create);

    if (me?.role !== "ADMIN" && input.role !== "USER") {
      const error = createErrorMessage(authError);
      throw new Error(error);
    }

    const user = await UserModel.create(input);
    return user;
  },

  updateUser: async (_parent: any, { input }: { input: z.infer<typeof userV.update> }, context: any) => {
    const me = await context.getUser();

    checkAuthetication(me);
    doerCanDo(me, input.id);
    checkRequiredFields(input, userV.update);

    const { id, oldPassword, ...rest } = input;
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        const error = createErrorMessage(userNotFound);
        throw new Error(error);
      }

      const decryptedPassword = await bcrypt.compare(oldPassword, user.password as string);
      if (!decryptedPassword) {
        const error = createErrorMessage(invalidCredentials);
        throw new Error(error);
      }

      //For some reason, Frontend is sending an empty string for some fields, so we need to prune them here.
      //TODO: investigate why this is happening on frontend
      pruneEmptyValues(rest);

      user.set(rest);
      await user.save();

      return user;
    } catch (e) {
      TreatMongoUniqueFieldsError(e);
      throw new Error(e);
    }
  },

  deleteUser: async (_parent: any, { id }: { id: string }, context: any) => {
    const me = await context.getUser();

    if (!me) {
      const error = createErrorMessage(authError);
      throw new Error(error);
    }

    doerCanDo(me, id);

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      const error = createErrorMessage(userNotFound);
      throw new Error(error);
    }

    if (me.id == id) await context.logout();

    return true;
  },

  login: async (_parent: any, { input: { user: username, password } }, context) => {
    const loggedUser = await context.authenticate("graphql-local", {
      username,
      password,
    });

    await context.login(loggedUser);
    return loggedUser.user;
  },

  logout: async (_parent: any, __: any, context: any) => {
    await context.logout();
    return true;
  },
};

const query = {
  users: async (_parent: any, { filter }: { filter: z.infer<typeof userV.base> }, context: any) => {
    const me = await context.getUser();

    checkAuthetication(me);
    //TODO: enhance the filter algorithm to account for partial matches
    const users = await UserModel.find(filter);

    return users;
  },

  user: async (_parent: any, { id }, context: any) => {
    const me = await context.getUser();
    console.log(me);
    checkAuthetication(me);
    viewerCanView(id, me);

    const user = await UserModel.findById(id || me.id)
      .populate("projectCount")
      .populate("clientCount")
      .populate("totalTaskCount");

    const projects = await ProjectModel.find({ user: id || me.id });
    const clients = await ClientModel.find({ user: id || me.id });

    const taskCountByStatus = await user?.countTasksByType();
    const userWithTasks = { ...user?.toObject(), taskCountByStatus, projects, clients };
    return userWithTasks;
  },

  isLoggedIn: async (_parent: any, __: any, context: any) => {
    const me = await context.getUser();

    return !!me;
  },
};

export const userResolvers = { query, mutation };
