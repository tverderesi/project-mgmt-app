import { graphql } from "react-relay";

export const CREATE_USER = graphql`
  mutation userCreateMutation($input: UserInput!) {
    createUser(input: $input) {
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

export const UPDATE_USER = graphql`
  mutation userUpdateMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        role
        name
        email
      }
      error {
        message
        type
      }
    }
  }
`;

export const DELETE_USER = graphql`
  mutation userDeleteMutation($id: ID!) {
    deleteUser(id: $id) {
      error {
        message
        type
      }
      status
    }
  }
`;
