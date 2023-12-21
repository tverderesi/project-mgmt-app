import { TypedDocumentNode, gql } from "@apollo/client";

interface CreateUser {
  createUser: {
    id: string;
    name: string;
    username: string;
    email: string;
    photo: string;
    role: string;
  };
}

interface CreateUserVariables {
  input: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
}

export const SIGN_UP: TypedDocumentNode<CreateUser, CreateUserVariables> = gql`
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
