import { ClientModel } from "@/models/Client";
import { z } from "zod";
import clientV from "@/validators/client";
import { checkAuthentication, isCurrentUserOrAdmin, adminViewershipCheck, checkRoleAuthorization } from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";
import { UserModel } from "@/models/User";

const query = {
  clients: async (_parent, args: Partial<z.infer<typeof clientV.query>>, context) => {
    await checkAuthentication(context);
    await adminViewershipCheck(context, args);

    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT), sort, ...rest } = args;
    if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");
    const clients = await ClientModel.find(rest).limit(limit).skip(skip).sort(sort);

    return clients;
  },

  client: async (_parent, { id }: { id: string }, context) => {
    await checkAuthentication(context);

    const client = await ClientModel.findById(id);
    if (!client || client === null) throw new Error("Client not found!");

    return client;
  },

  deletedClients: async (_parent, args: Partial<z.infer<typeof clientV.query>>, context) => {
    await checkAuthentication(context);
    await adminViewershipCheck(context, args);

    const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } = args;
    if (skip === undefined || !limit) throw new Error("Skip and limit are required on the environment variables!");

    const clients = await ClientModel.find({ deletedAt: { $ne: null } })
      .limit(limit)
      .skip(skip);

    return clients;
  },
};

const mutation = {
  createClient: async (_parent, { input }: { input: z.infer<typeof clientV.create> }, context) => {
    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, input.user);
    checkRequiredFields(input, clientV.create);

    const client = await ClientModel.create(input);
    await UserModel.findByIdAndUpdate(input.user, { $push: { clients: client._id } });

    return client;
  },

  updateClient: async (_parent, args: z.infer<typeof clientV.update>, context) => {
    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, args.user);

    const updatedClient = ClientModel.findByIdAndUpdate(args.id, args, { new: true });

    return updatedClient;
  },

  deleteClient: async (_parent, { _id }: { _id: string }, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);

      const deletedClient = await ClientModel.findByIdAndUpdate(_id, { deletedAt: new Date() });

      return deletedClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  restoreClient: async (_parent, { id }: { id: string }, context) => {
    await checkAuthentication(context);
    await isCurrentUserOrAdmin(context, id);

    const restoredClient = await ClientModel.findByIdAndUpdate(id, { deletedAt: null });

    return restoredClient;
  },

  purgeClient: async (_parent, { id }: { id: string }, context) => {
    await checkAuthentication(context);
    await checkRoleAuthorization(context, "ADMIN");

    const purgedClient = await ClientModel.findByIdAndDelete(id);
    if (!purgedClient) throw new Error("Client not found!");

    return purgedClient;
  },
};

export const clientResolvers = { query, mutation };
