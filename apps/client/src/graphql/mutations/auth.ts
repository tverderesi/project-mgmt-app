import { graphql } from "react-relay";

export const LOGIN = graphql`
  mutation authLoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        role
        name
      }
      error {
        message
        type
      }
    }
  }
`;
