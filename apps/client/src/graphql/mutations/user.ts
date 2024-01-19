import { graphql } from "react-relay";

export const CREATE_USER = graphql`
  mutation userCreateMutation($input: UserInput!) {
    createUser(input: $input) {
      id
      role
      name
    }
  }
`;

export const UPDATE_USER = graphql`
  mutation userUpdateMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      role
      name
      email
      username
    }
  }
`;
