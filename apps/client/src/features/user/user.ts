import { graphql } from "react-relay";

export const DELETE_USER = graphql`
  mutation userDeleteMutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      success
    }
  }
`;
