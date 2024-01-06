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
