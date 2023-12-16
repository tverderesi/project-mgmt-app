import { gql } from "@apollo/client";

export const IS_AUTHENTICATED = gql`
  query CurrentUser {
    currentUser {
      id
      name
      username
      email
      password
      photo
      role
    }
  }
`;
