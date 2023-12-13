import { UserModel } from "@/models/User";
import { z } from "zod";

const userValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  deletedAt: z.string().datetime().or(z.boolean()).optional(),
  projects: z.array(z.string()).optional(),
  clients: z.array(z.string()).optional(),
  role: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const userQuery = {
  users: async (parent: any, args: Partial<z.infer<typeof userValidator>>, context) => {
    await checkAuthorization(context, "ADMIN");
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

  user: async (parent: any, { id }) => {
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

  deletedUsers: async (parent: any, args: Partial<z.infer<typeof userValidator>>, context) => {
    const currentUser = await context.getUser();
    if (!currentUser) throw new Error("User not authenticated!");
    if (currentUser.role !== "ADMIN") throw new Error("User not authorized!");
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
