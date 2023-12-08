import ClientModel from "@/models/Client";
import { z } from "zod";

const userValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  photo: z.any().optional(),
  userId: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const clientResolver = {
  users: async (parent: any, args: Partial<z.infer<typeof userValidator>>) => {
    try {
      const users = await ClientModel.find(args).limit(args.limit).skip(args.skip).sort(args.sort);
      if (!users || users.length === 0) throw new Error("No users found!");
      return users;
    } catch (error) {
      return new Error(error.message);
    }
  },
  client: async (parent: any, { id }) => {
    try {
      const client = ClientModel.findById(id);
      if (!client) throw new Error("Client not found!");
      return client;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default clientResolver;
