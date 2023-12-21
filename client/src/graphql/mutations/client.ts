import { TypedDocumentNode, gql } from "@apollo/client";

interface CreateClient {
  createClient: {
    phone: string;
    name: string;
    email: string;
  };
}
interface CreateClientVariables {
  input: {
    phone: string;
    name: string;
    email: string;
  };
}

export const CREATE_CLIENT: TypedDocumentNode<CreateClient, CreateClientVariables> = gql`
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
    }
  }
`;
