import { GraphQLID, GraphQLList } from "graphql";
import ClientModel from "@/models/Client";
import { ClientType } from "@/graphql/types/client";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const clientValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  photo: z.any().nullable().optional(),
  userId: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const clients = {
  type: new GraphQLList(ClientType),
  resolve: async (parent: any, args: Partial<z.infer<typeof clientValidator>>) => {
    const errors = [];
    try {
      const argValidation = clientValidator.safeParse(args);

      Object.keys(argValidation).map((key) => {
        if (argValidation[key].success === false) {
          errors.push({ arg: key, message: fromZodError(argValidation[key].error).message });
        }
      });

      const clients = ClientModel.find(args).limit(args.limit).skip(args.skip).sort(args.sort);
      if (!clients || (await clients).length === 0) {
        throw new Error("Client not found.");
      }
      return clients;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
export const client = {
  type: ClientType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, args: { id: any }) {
    return ClientModel.findById(args.id);
  },
};

export default {
  clients,
  client,
};
