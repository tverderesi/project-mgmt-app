import { graphql } from "react-relay";

export const CREATE_CLIENT = graphql`
  mutation clientCreateMutation($input: ClientInput!) {
    createClient(input: $input) {
      id
      name
      email
      phone
    }
  }
`;
