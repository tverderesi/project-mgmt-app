import { graphql } from "relay-runtime";

export const authLoginMutation = graphql`
  mutation authLoginMutation($input: LoginInput!) {
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

export const authLogoutMutation = graphql`
  mutation authLogoutMutation {
    logout
  }
`;
