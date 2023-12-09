import { UserModel } from "@/models/User";
import { z } from "zod";

const userValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  projects: z.array(z.string()).optional(),
  clients: z.array(z.string()).optional(),
  role: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const userResolver = {
  users: async (parent: any, args: Partial<z.infer<typeof userValidator>>) => {
    try {
      const users = await UserModel.find(args).limit(args.limit).skip(args.skip).sort(args.sort);
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
};
