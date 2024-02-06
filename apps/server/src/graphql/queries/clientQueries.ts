import { ClientModel } from "@/models/Client";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { clientType } from "../schema/clientType";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { User } from "@/models/User";
import { fromGlobalId } from "graphql-relay";

export const clientQueries = {
  clients: {
    name: "Clients",
    description: "This query returns all clients in the system. It is not yet paginated or filtered.",
    type: new GraphQLList(clientType),
    resolve: async (_, args) => {
      const clients = await ClientModel.find();
      return clients;
    },
  },
  client: {
    name: "Client",
    description: "This query returns a client by its ID.",
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: clientType,
    resolve: async (_, args, context: any) => {
      const me = context.getUser() as User;
      checkAuthetication(me);
      const { id } = fromGlobalId(args.id);
      const client = await ClientModel.findById(id);
      return client;
    },
  },
};
