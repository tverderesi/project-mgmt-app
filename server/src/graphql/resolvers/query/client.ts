import ClientModel from "@/models/Client";
import { z } from "zod";

const clientValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  deletedAt: z.string().optional(),
  phone: z.string().optional(),
  photo: z.any().optional(),
  userId: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const clientResolver = {
  clients: async (parent: any, args: Partial<z.infer<typeof clientValidator>>, contextValue) => {
    try {
      const clients = await ClientModel.find();
      if (!clients || clients.length === 0) throw new Error("No clients found!");
      return clients;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  client: async (_parent: any, { id }: { id: string }) => {
    try {
      const client = await ClientModel.findById(id);
      if (!client || client === null) throw new Error("Client not found!");
      return client;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default clientResolver;
