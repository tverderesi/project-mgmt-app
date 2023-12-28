import { loginSchema } from "@/validators/auth";
import { TypedDocumentNode, gql } from "@apollo/client";
import { z } from "zod";
import { userValidator } from "@/validators/user";
import { Input } from "../shared/interfaces";

export const LOGIN: TypedDocumentNode<{ login: z.infer<typeof userValidator> }, Input<z.infer<typeof loginSchema>>> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      username
      email
      photo
      role
    }
  }
`;

export const LOGOUT: TypedDocumentNode<{ logout: boolean }> = gql`
  mutation Mutation {
    logout
  }
`;
