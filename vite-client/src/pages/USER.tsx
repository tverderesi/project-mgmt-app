import { gql } from "@apollo/client";

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
        name
      }
      role
    }
  }
`;
