import { ClientModel } from "@/models/Client";
import { z } from "zod";
import clientV from "@/validators/client";
import { checkRequiredFields } from "@/utils/field";
import { UserModel } from "@/models/User";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { viewerCanView } from "@/utils/viewerCanView";

const query = {
  clients: async (
    _parent,
    args: { first: number; after: string; last: number; before: string; filter: z.infer<typeof clientV.filter> },
    context
  ) => {
    const me = await context.getUser();
    checkAuthetication(me);
    if (!args.filter) args.filter = {};
    if (me.role !== "ADMIN") args.filter.user = me.id;
    const { first = 10, after, last = 10, before, filter } = args;

    let clients;
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (after) {
      clients = await ClientModel.find({ _id: { $gt: after }, ...filter })
        .sort({ _id: 1 })
        .limit(first + 1);
      hasNextPage = clients.length > first;
      if (hasNextPage) clients.pop();
      const previousClient = await ClientModel.findOne({ _id: { $lt: clients.length > 0 ? clients[0]._id : after } }).sort({
        _id: -1,
      });
      hasPreviousPage = !!previousClient;
    } else if (before) {
      clients = await ClientModel.find({ _id: { $lt: before }, ...filter }).limit(last + 1);
      hasPreviousPage = clients.length > last;
      if (hasPreviousPage) clients.pop();
      clients = clients.reverse();
      const nextClient = await ClientModel.findOne({ _id: { $gt: clients.length > 0 ? clients[0]._id : before } }).sort({
        _id: 1,
      });
      hasNextPage = !!nextClient;
    } else {
      clients = ClientModel.find()
        .sort({ _id: 1 })
        .limit(first + 1);
      hasNextPage = clients.length > first;
      if (hasNextPage) clients.pop();
    }

    const edges = clients.map((client) => ({
      cursor: client.id,
      node: client,
    }));

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return { edges, pageInfo };
  },

  client: async (_parent, { id }: { id: string }, context) => {
    const me = await context.getUser();
    checkAuthetication(me);
    const client = await ClientModel.findById(id);
    if (!client || client === null) throw new Error("Client not found!");
    return client;
  },

  clientCount: async (_parent, { user }: { user: string }, context) => {
    const me = await context.getUser();
    checkAuthetication(me);
    viewerCanView(user, me);
    const clientCount = await ClientModel.countDocuments({ user });
    return clientCount;
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
