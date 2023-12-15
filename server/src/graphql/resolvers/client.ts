import { ClientModel } from "@/models/Client";
import { z } from "zod";
import { clientValidator, createClientValidator, updateClientValidator } from "@/validators/client";
import {
  checkAuthentication,
  isCurrentUserOrAdmin,
  adminViewershipCheck,
  checkRoleAuthorization,
} from "@/utils/auth";
import { checkRequiredFields } from "@/utils/field";

export const query = {
  clients: async (parent: any, args: Partial<z.infer<typeof clientValidator>>, context) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);
      const {
        skip = Number(process.env.DEFAULT_SKIP),
        limit = Number(process.env.DEFAULT_LIMIT),
        sort,
        ...rest
      } = args;
      if (skip === undefined || !limit)
        throw new Error("Skip and limit are required on the environment variables!");

      const clients = await ClientModel.find(rest).limit(limit).skip(skip).sort(sort);

      return clients;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  client: async (_parent: any, { id }: { id: string }, context) => {
    try {
      await checkAuthentication(context);
      const client = await ClientModel.findById(id);
      if (!client || client === null) throw new Error("Client not found!");
      return client;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deletedClients: async (parent: any, args: Partial<z.infer<typeof clientValidator>>, context) => {
    try {
      await checkAuthentication(context);
      await adminViewershipCheck(context, args);
      const { skip = Number(process.env.DEFAULT_SKIP), limit = Number(process.env.DEFAULT_LIMIT) } =
        args;
      if (skip === undefined || !limit)
        throw new Error("Skip and limit are required on the environment variables!");
      const clients = await ClientModel.find({ deletedAt: { $ne: null } })
        .limit(limit)
        .skip(skip);
      return clients;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const mutation = {
  createClient: async (parent: any, args: z.infer<typeof createClientValidator>, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, args.userId);

      checkRequiredFields(args, createClientValidator);

      const client = await ClientModel.create(args);
      return client;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateClient: async (parent: any, args: z.infer<typeof updateClientValidator>, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, args.userId);
      const updatedClient = ClientModel.findByIdAndUpdate(args._id, args, { new: true });
      return updatedClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteClient: async (parent: any, { _id }: { _id: string }, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, _id);
      const deletedClient = await ClientModel.findByIdAndUpdate(_id, { deletedAt: new Date() });
      return deletedClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  restoreClient: async (parent: any, { id }: { id: string }, context) => {
    try {
      await checkAuthentication(context);
      await isCurrentUserOrAdmin(context, id);
      const restoredClient = await ClientModel.findByIdAndUpdate(id, { deletedAt: null });
      return restoredClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  purgeClient: async (parent: any, { id }: { id: string }, context) => {
    try {
      await checkAuthentication(context);
      await checkRoleAuthorization(context, "ADMIN");
      //TODO: Implment project update to remove client from projects or delete projects
      const purgedClient = await ClientModel.findByIdAndDelete(id);
      return purgedClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
