import { clientValidator, createClientValidator } from "@/validators/client";
import { TypedDocumentNode, gql } from "@apollo/client";
import { z } from "zod";

export const CREATE_CLIENT: TypedDocumentNode<
  {
    createClient: z.infer<typeof clientValidator>;
  },
  {
    input: Omit<z.infer<typeof createClientValidator>, "id" | "countryCode">;
  }
> = gql`
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
    }
  }
`;
