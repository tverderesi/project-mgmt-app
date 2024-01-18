import { graphql } from "react-relay";

export const LOGIN = graphql`
  mutation authLoginMutation($input: LoginInput!) {
    login(input: $input) {
      id
      name
      role
    }
  }
`;
