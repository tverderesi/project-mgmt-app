import bcrypt from "bcrypt";
import { UserModel, CreateUserInput, UpdateUserInput } from "@/models/User";
import {
  createUserInputValidator,
  updateUserInputValidator,
} from "@/validators/userInputValidator";
import { getUniqueKeys, checkUniqueKeys } from "@/utils/uniqueKeyUtils";

export const userMutations = {
  createUser: async (_parent: any, { input }: { input: Partial<CreateUserInput> }, context) => {
    const currentUser = await context.getUser();
    try {
      const result = createUserInputValidator.safeParse(input);
      if (!result.success) {
        const formatted = result.error.format();
        const errors = Object.keys(formatted)
          .filter((key) => key !== "_errors")
          .map((key) => JSON.stringify({ [key]: formatted[key]?._errors?.[0] }));
        if (errors.length > 0) {
          throw new Error(errors.join(", "));
        }
      }
      if (currentUser.role !== "ADMIN" && input.role === "ADMIN") {
        throw new Error("User not authorized!");
      }
      const uniqueKeys = getUniqueKeys(UserModel);
      await checkUniqueKeys(input, uniqueKeys);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(input.password as string, salt);
      if (input) {
        delete input.confirmPassword;
        delete input.confirmEmail;
      }
      const user = await UserModel.create({ ...input, password: hashedPassword });
      if (!user) {
        throw new Error("Error creating user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (parent: any, { input: { user, password } }, context) => {
    const loggedUser = await context.authenticate("graphql-local", {
      username: user,
      password,
    });
    await context.login(loggedUser);
    return loggedUser.user;
  },
  logout: async (parent: any, args, context) => {
    await context.logout();
    return true;
  },

  updateUser: async (_parent: any, { input }: { input: Partial<UpdateUserInput> }) => {
    try {
      const result = updateUserInputValidator.safeParse(input);
      if (!result.success) {
        const formatted = result.error.format();
        const errors = Object.keys(formatted)
          .filter((key) => key !== "_errors")
          .map((key) => JSON.stringify({ [key]: formatted[key]?._errors?.[0] }));
        if (errors.length > 0) {
          throw new Error(errors.join(", "));
        }
      }
      const uniqueKeys = getUniqueKeys(UserModel);
      await checkUniqueKeys(input, uniqueKeys);
      const user = await UserModel.findByIdAndUpdate(input.id, input, { new: true });
      if (!user) {
        throw new Error("Error updating user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (_parent: any, { id }: { id: string }) => {
    try {
      const user = await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
      if (!user) {
        throw new Error("Error deleting user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  restoreUser: async (_parent: any, { id }: { id: string }) => {
    try {
      const user = await UserModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
      if (!user) {
        throw new Error("Error restoring user!");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  purgeUser: async (_parent: any, { id }: { id: string }) => {
    try {
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
