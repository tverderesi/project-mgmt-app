import { graphql } from "react-relay";

export const ME = graphql`
  query userMeQuery {
    me {
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

export const USER_QUERY = graphql`
  query userUserQuery($id: ID!) {
    user(id: $id) {
      user {
        name
        username
        email
      }
      error {
        message
        type
      }
    }
  }
`;
