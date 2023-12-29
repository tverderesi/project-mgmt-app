import { graphql } from "relay-runtime";

export const CREATE_CLIENT = graphql`
  mutation clientCreateClientMutation($input: ClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
    }
  }
`;
