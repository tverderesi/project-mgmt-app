import { UserModel, CreateUserInput, UpdateUserInput } from "@/models/User";
import {
  createUserInputValidator,
  updateUserInputValidator,
  userQueryValidator,
} from "@/validators/userValidator";
import { getUniqueFields, checkUniqueFields } from "@/utils/fieldUtils";
import { requiredFieldsCheck } from "@/utils/fieldUtils";
import { z } from "zod";
import { transformToUser } from "../../utils/dtos/transformToUser";
import {
  isCurrentUserOrAdmin,
  checkRoleAuthorization,
  checkAuthentication,
} from "@/utils/authUtils";
const mutation = {
  createUser: async (_: any, { input }: { input: CreateUserInput }, context) => {
    try {
      const currentUser = await context.getUser();
      if (currentUser.role !== "ADMIN" && input.role === "ADMIN") {
        throw new Error("Unauthorized action!");
      }

      requiredFieldsCheck(input, createUserInputValidator);

      const uniqueKeys = getUniqueFields(UserModel);
      await checkUniqueFields(input, uniqueKeys);

      const newUser = transformToUser({ ...input });

      const user = await UserModel.create(newUser);
      if (!user) {
        throw new Error("Error creating user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (parent: any, { input: { user: username, password } }, context) => {
    const loggedUser = await context.authenticate("graphql-local", {
      username,
      password,
    });

    await context.login(loggedUser);
    return loggedUser.user;
  },

  logout: async (_: any, __: any, context: any) => {
    await context.logout();
    return true;
  },

  updateUser: async (_: any, { input }: { input: Partial<UpdateUserInput> }, context: any) => {
    try {
      if (!input?.id) throw new Error("User ID not provided!");
      await isCurrentUserOrAdmin(context, input.id);

      requiredFieldsCheck(input, updateUserInputValidator);

      if (input.role === "ADMIN") {
        await checkRoleAuthorization(context, "ADMIN");
      }

      const uniqueKeys = getUniqueFields(UserModel);
      await checkUniqueFields(input, uniqueKeys);

      const updatedUser = transformToUser(input);

      const user = await UserModel.findByIdAndUpdate(input.id, updatedUser, { new: true });
      if (!user) {
        throw new Error("Error updating user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (_: any, { id }: { id: string }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, id);
      const user = await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
      if (!user) {
        throw new Error("Error deleting user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  restoreUser: async (_: any, { id }: { id: string }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, id);
      const user = await UserModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
      if (!user) {
        throw new Error("Error restoring user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  purgeUser: async (_parent: any, { id }: { id: string }, context: any) => {
    try {
      await checkRoleAuthorization(context, "ADMIN");
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error("Error purging user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const query = {
  users: async (_: any, args: Partial<z.infer<typeof userQueryValidator>>, context) => {
    await checkRoleAuthorization(context, "ADMIN");
    const {
      skip = Number(process.env.DEFAULT_SKIP),
      limit = Number(process.env.DEFAULT_LIMIT),
      sort,
      ...rest
    } = args;
    try {
      if (skip === undefined || !limit)
        throw new Error("Skip and limit are required on the environment variables!");
      const users = await UserModel.find({ deletedAt: null, ...rest })
        .limit(limit)
        .skip(skip)
        .sort(sort);
      if (!users || users.length === 0) throw new Error("No users found!");
      return users;
    } catch (error) {
      return new Error(error.message);
    }
  },

  user: async (_: any, { id }, context: any) => {
    await isCurrentUserOrAdmin(context, id);
    try {
      const user = UserModel.findById(id);
      if (!user) throw new Error("Client not found!");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  currentUser: async (parent, args, context) => {
    return await context.getUser();
  },

  deletedUsers: async (parent: any, args: Partial<z.infer<typeof userQueryValidator>>, context) => {
    const currentUser = await context.getUser();
    await checkAuthentication(context);
    await checkRoleAuthorization(context, "ADMIN");
    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } =
      args;
    try {
      if (skip === undefined || !limit)
        throw new Error("Skip and limit are required on the environment variables!");
      const users = await UserModel.find({ deletedAt: { $ne: null } })
        .limit(limit)
        .skip(skip);
      if (!users || users.length === 0) throw new Error("No users found!");
      return users;
    } catch (error) {
      return new Error(error.message);
    }
  },
};

export const userResolvers = { query, mutation };
