import { graphql } from "react-relay";

export const CREATE_CLIENT = graphql`
  mutation clientCreateMutation($input: CreateClientInput!) {
    createClient(input: $input) {
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
