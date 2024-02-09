import { graphql } from "react-relay";
export const clientQuery = graphql`
  query clientClientQuery($id: String!) {
    client(id: $id) {
      name
      email
      phone
    }
  }
`;
