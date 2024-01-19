import { graphql } from "react-relay";

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
