import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { Client } from "@/models/Client";
import { nodeInterface } from "./nodeType";

export const clientType = new GraphQLObjectType<Client, any>({
  name: "Client",
  description: "Represents a Client in the system. A client is a company or a person that has projects. A client isn't a user.",
  fields: () => ({
    id: globalIdField("Client"),
    name: { type: GraphQLString, resolve: (client) => client.name },
    email: { type: GraphQLString, resolve: (client) => client.email },
    phone: { type: GraphQLString, resolve: (client) => client.phone },
    user: { type: GraphQLString, resolve: (client) => client.user },
    createdAt: { type: GraphQLString, resolve: (client) => client.createdAt },
    updatedAt: { type: GraphQLString, resolve: (client) => client.updatedAt },
  }),
  interfaces: () => [nodeInterface],
});

export const clientConnection = connectionDefinitions({
  name: "Client",
  nodeType: clientType,
});
