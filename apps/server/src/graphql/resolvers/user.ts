import { UserModel } from "@/models/User";
import userV from "@/validators/user";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
import bcrypt from "bcrypt";
import e from "express";
const createErrorMessage = (e: any) => {
  return "STR_ERR&&" + JSON.stringify({ type: "INPUT_ERROR", message: e.message }) + "&&END_ERR";
};
const mutation = {
  createUser: async (_parent: any, { input }: { input: z.infer<typeof userV.create> }, context: any) => {
    const error = checkRequiredFields(input, userV.create);
    if (error) return { user: null, error };
    const user = await UserModel.create(input);
    return { user, error: {} };
  },

  updateUser: async (_parent: any, { input }: { input: z.infer<typeof userV.update> }, context: any) => {
    const me = await context.getUser();

    if (!me) throw new Error(createErrorMessage({ type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" }));
    if (me.id !== input.id && me.role !== "ADMIN") {
      throw new Error(
        createErrorMessage({ type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" })
      );
    }
    const error = checkRequiredFields(input, userV.update);

    if (error) throw new Error(createErrorMessage(error));
    const { id, ...rest } = input;
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new Error(createErrorMessage({ type: "USER_ERROR_NOT_FOUND", message: "User not found!" }));
      const decryptedPassword = await bcrypt.compare(input.oldPassword, user.password as string);
      if (!decryptedPassword)
        throw new Error(createErrorMessage({ type: "USER_ERROR_INVALID_CREDENTIALS", message: "Invalid Credentials!" }));

      Object.keys(rest).forEach((key) => rest[key] === undefined || rest[key] === null || (rest[key] === "" && delete rest[key]));

      user.set(rest);
      await user.save();
      return { user, error: {} };
    } catch (e) {
      if (e.code === 11000) {
        const duplicatedFields = Object.keys(e.keyPattern);
        const message = duplicatedFields.map((field) => `${field} is already on the database!`).join(", ");
        const stringifiedErrorMessage = JSON.stringify({ [duplicatedFields[0]]: message });
        throw new Error(createErrorMessage({ type: "INPUT_ERROR", message: stringifiedErrorMessage }));
      }
      console.log(e);
      throw new Error(e);
    }
  },

  deleteUser: async (_parent: any, { id }: { id: string }, context: any) => {
    const me = await context.getUser();
    if (!me) return { status: "ERROR", error: { type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" } };
    if (me.id !== id && me.role !== "ADMIN")
      return {
        status: "ERROR",
        error: { type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" },
      };
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return { status: "ERROR", error: { type: "USER_ERROR_NOT_FOUND", message: "User not found!" } };
    if (me.id == id) await context.logout();
    return { status: "OK", error: {} };
  },

  login: async (_parent: any, { input: { user: username, password } }, context) => {
    const loggedUser = await context.authenticate("graphql-local", {
      username,
      password,
    });

    await context.login(loggedUser);
    return { user: loggedUser.user, error: {} };
  },

  logout: async (_parent: any, __: any, context: any) => {
    await context.logout();
    return true;
  },
};

const query = {
  users: async (_parent: any, { filter }: { filter: z.infer<typeof userV.base> }, context: any) => {
    const errors: { type: string; message: string }[] = [];
    const me = await context.getUser();

    if (!me) {
      errors.push({ type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" });
      return { users: [], errors };
    }

    if (me.role !== "ADMIN") {
      errors.push({ type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" });
      return { users: [], errors };
    }
    //TODO: enhance the filter algorithm to account for partial matches
    const users = await UserModel.find(filter);
    return { users, errors };
  },

  user: async (_parent: any, { id }, context: any) => {
    const me = await context.getUser();

    if (!me) {
      return { user: null, error: { type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" } };
    }

    if (me.id !== id && me.role !== "ADMIN") {
      return {
        user: null,
        error: { type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" },
      };
    }

    const user = await UserModel.findById(id).populate("projectCount").populate("clientCount").populate("taskCount");
    return { user, error: {} };
  },
  me: async (_parent: any, __: any, context: any) => {
    const me = await context.getUser();

    if (!me) return { user: null, error: { type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" } };
    return { user: me, error: {} };
  },
};

export const userResolvers = { query, mutation };
