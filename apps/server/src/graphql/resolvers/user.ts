import { UserModel } from "@/models/User";
import { createUserValidator, updateUserValidator, userValidator } from "@/validators/user";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
import { isCurrentUserOrAdmin, checkRoleAuthorization, checkAuthentication } from "@/utils/auth";

const mutation = {
  createUser: async (_parent: any, { input }: { input: z.infer<typeof createUserValidator> }, context: any) => {
    try {
      const currentUser = await context.getUser();

      if (currentUser?.role !== "ADMIN" && input?.role === "ADMIN") {
        throw new Error("Unauthorized action!");
      }

      checkRequiredFields(input, createUserValidator);

      const user = await UserModel.create(input);
      if (!user) {
        throw new Error("Error creating user!");
      }
      return user;
    } catch (error) {
      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0].substring(0, 1).toUpperCase() + Object.keys(error.keyValue)[0].substring(1);

        throw new Error(`${key} already exists!`);
      }
      throw new Error(error.message);
    }
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

  updateUser: async (_parent: any, { input }: { input: z.infer<typeof updateUserValidator> }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, input._id);
      checkRequiredFields(input, updateUserValidator);

      if (input.role === "ADMIN") {
        await checkRoleAuthorization(context, "ADMIN");
      }

      const { _id, ...rest } = input;

      const user = await UserModel.findByIdAndUpdate(_id, rest, { new: true });

      if (!user) {
        throw new Error("Error updating user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, _id);
      const user = await UserModel.findByIdAndUpdate(_id, { deletedAt: new Date() }, { new: true });
      if (!user) {
        throw new Error("Error deleting user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  restoreUser: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, _id);
      const user = await UserModel.findByIdAndUpdate(_id, { deletedAt: null }, { new: true });
      if (!user) {
        throw new Error("Error restoring user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  purgeUser: async (_parent: any, { _id }: { _id: string }, context: any) => {
    try {
      await checkRoleAuthorization(context, "ADMIN");
      const user = await UserModel.findByIdAndDelete(_id);
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
  users: async (_parent: any, args: z.infer<typeof userValidator>, context: any) => {
    try {
      await checkRoleAuthorization(context, "ADMIN");
      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
      if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");
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

  user: async (_parent: any, { id }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, id);
      const user = await UserModel.findById(id)
        .populate("clients")
        .populate("projectCount")
        .populate("clientCount")
        .populate("taskCount")
        .populate({
          path: "projects",
          populate: {
            path: "client",
            model: "Client",
          },
        });
      if (!user) throw new Error("User not found!");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  userStats: async (_parent: any, { id }, context: any) => {
    try {
      await isCurrentUserOrAdmin(context, id);
      const user = await UserModel.findById(id)
        .populate("projectCount")
        .populate("clientCount")
        .populate("totalTaskCount")
        .populate("taskCount");

      if (!user) throw new Error("User not found!");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  currentUser: async (_parent: any, _args: any, context: any) => {
    try {
      await checkAuthentication(context);
      return await context.getUser();
    } catch (error) {
      //map the errors to an array of errors and return it

      return [{ path: "name", message: error.message }];
    }
  },

  deletedUsers: async (_parent: any, args: z.infer<typeof userValidator>, context: any) => {
    try {
      await checkAuthentication(context);
      await checkRoleAuthorization(context, "ADMIN");
      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } = args;
      if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");
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
