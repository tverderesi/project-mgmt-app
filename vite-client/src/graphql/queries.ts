import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      username
      email
      photo
      role
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      id
      name
      username
      email
      password
      photo
      projects {
        name
      }
      clients {
        id
        name
      }
      role
    }
  }
`;
