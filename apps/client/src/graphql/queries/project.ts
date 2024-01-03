import { graphql } from "relay-runtime";

export const PROJECT = graphql`
  query projectProjectQuery($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
      tasks {
        id
        name
        description
        status
      }
    }
  }
`;
