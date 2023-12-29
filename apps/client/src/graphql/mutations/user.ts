import { graphql } from "relay-runtime";

export const SIGN_UP = graphql`
  mutation userCreateUserMutation($input: UserInput!) {
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
