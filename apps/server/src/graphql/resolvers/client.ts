import { ClientModel } from "@/models/Client";
import { z } from "zod";
import clientV from "@/validators/client";
import { checkRequiredFields } from "@/utils/field";
import { UserModel } from "@/models/User";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { viewerCanView } from "@/utils/viewerCanView";

const query = {
  clients: async (_parent, args: Partial<z.infer<typeof clientV.base>>, context) => {
    const me = await context.getUser();

    checkAuthetication(me);
    const clients = await ClientModel.find(args);
    return clients;
  },

  client: async (_parent, { id }: { id: string }, context) => {
    const client = await ClientModel.findById(id);
    if (!client || client === null) throw new Error("Client not found!");
    return client;
  },
};

const mutation = {
  createClient: async (_parent, { input }: { input: z.infer<typeof clientV.create> }, context) => {
    checkRequiredFields(input, clientV.create);
    const client = await ClientModel.create(input);
    await UserModel.findByIdAndUpdate(input.user, { $push: { clients: client._id } });
    return client;
  },

  updateClient: async (_parent, args: z.infer<typeof clientV.update>, context) => {
    const updatedClient = ClientModel.findByIdAndUpdate(args.id, args, { new: true });
    return updatedClient;
  },

  deleteClient: async (_parent, { id }: { id: string }, context) => {
    const purgedClient = await ClientModel.findByIdAndDelete(id);
    if (!purgedClient) throw new Error("Client not found!");
    return purgedClient;
  },
};

export const clientResolvers = { query, mutation };
