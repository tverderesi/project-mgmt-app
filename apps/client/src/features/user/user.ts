import { graphql } from "react-relay";

export const DELETE_USER = graphql`
  mutation userDeleteMutation($id: ID!) {
    deleteUser(id: $id)
  }
`;
