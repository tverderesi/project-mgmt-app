import { TypedDocumentNode, gql } from "@apollo/client";
import { userValidator, createUserValidator } from "@/validators/user";
import { z } from "zod";

export const SIGN_UP: TypedDocumentNode<
  {
    createUser: z.infer<typeof userValidator>;
  },
  { input: z.infer<typeof createUserValidator> }
> = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      username
      email
      photo
      role
    }
  }
`;
