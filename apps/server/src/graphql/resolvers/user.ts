import { UserModel } from "@/models/User";
import userV from "@/validators/user";
import { checkRequiredFields } from "@/utils/field";
import { z } from "zod";
const mutation = {
  createUser: async (_parent: any, { input }: { input: z.infer<typeof userV.create> }, context: any) => {
    checkRequiredFields(input, userV.create);
    const user = await UserModel.create(input);
    return user;
  },

  updateUser: async (_parent: any, args: z.infer<typeof userV.update>, context: any) => {
    checkRequiredFields(args, userV.update);
    const user = await UserModel.findByIdAndUpdate(args.id, args, { new: true });
    if (!user) throw new Error("User not found!");
    return user;
  },

  deleteUser: async (_parent: any, { _id }: { _id: string }, context: any) => {
    const user = await UserModel.findByIdAndDelete(_id);
    if (!user) throw new Error("User not found!");
    return "User deleted successfully!";
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
  users: async (_parent: any, args: z.infer<typeof userV.query>, context: any) => {
    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
    const users = await UserModel.find({ deletedAt: null, ...rest })
      .limit(limit)
      .skip(skip)
      .sort(sort);
    return users;
  },

  user: async (_parent: any, { id }, context: any) => {
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
    return user;
  },
  me: async (_parent: any, _args: any, context: any) => {
    const me = await context.getUser();
    return me;
  },
};

export const userResolvers = { query, mutation };
