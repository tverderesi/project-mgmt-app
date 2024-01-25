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

const query = {
  users: async (
    _parent: any,
    args: { first: number; after: string; last: number; before: string; filter: z.infer<typeof userV.filter> },
    context: any
  ) => {
    const me = await context.getUser();

    checkAuthetication(me);
    viewerCanView(me.id, me);

    const { first = 10, after, last = 10, before } = args;
    const { filter } = args;
    let users;
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (after) {
      users = await UserModel.find({ _id: { $gt: after }, ...filter })
        .limit(first + 1)
        .sort({ _id: 1 });
      hasNextPage = users.length > first;
      if (hasNextPage) users.pop();
      const previousUser = await UserModel.findOne({ _id: { $lt: users.length > 0 ? users[0]._id : after } }).sort({ _id: -1 });
      hasPreviousPage = !!previousUser;
    } else if (before) {
      users = await UserModel.find({ _id: { $lt: before } })
        .sort({ _id: -1 })
        .limit(last + 1);
      hasPreviousPage = users.length > last;
      if (hasPreviousPage) users.pop();
      users = users.reverse();
      const nextUser = await UserModel.findOne({ _id: { $gt: users.length > 0 ? users[0]._id : before } }).sort({ _id: 1 });
      hasNextPage = !!nextUser;
    } else {
      users = await UserModel.find()
        .sort({ _id: 1 })
        .limit(first + 1);
      hasNextPage = users.length > first;
      if (hasNextPage) users.pop();
    }

    const edges = users.map((user) => ({
      cursor: user.id,
      node: user,
    }));

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
    };

    return { pageInfo, edges };
  },

  user: async (_parent: any, { id }, context: any) => {
    const me = await context.getUser();
    checkAuthetication(me);

    const user = await UserModel.findById(me.role === "ADMIN" ? id : me.id);

    return user;
  },

  isLoggedIn: async (_parent: any, __: any, context: any) => {
    const me = await context.getUser();
    return !!me;
  },
};

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
    checkAuthetication(me);

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

export const userResolvers = { query, mutation };
