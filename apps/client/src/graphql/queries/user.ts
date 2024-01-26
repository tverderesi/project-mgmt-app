import { graphql } from "react-relay";

export const USER = graphql`
  query userUserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
    }
  }
`;
