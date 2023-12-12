import bcrypt from "bcrypt";
import { UserModel, UserInput } from "@/models/User";
import {
  createUserInputValidator,
  updateUserInputValidator,
  userInputValidator,
} from "@/validators/userInputValidator";
import { getUniqueKeys, checkUniqueKeys } from "@/utils/uniqueKeyUtils";

export const userMutations = {
  createUser: async (_parent: any, { input }: { input: Partial<UserInput> }) => {
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

  updateUser: async (_parent: any, { input }: { input: Partial<UserInput> }) => {
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
};
