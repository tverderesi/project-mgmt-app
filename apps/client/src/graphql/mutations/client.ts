import { graphql } from "react-relay";

export const CREATE_CLIENT = graphql`
  mutation clientCreateMutation($input: CreateClientInput!, $connections: [ID!]!) {
    createClient(input: $input) {
      clientEdge @appendEdge(connections: $connections) {
        node {
          id
          name
          email
          phone
        }
      }
    }
  }
`;
