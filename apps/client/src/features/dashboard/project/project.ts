import { graphql } from "relay-runtime";

const PROJECTS = graphql`
  query projectQuery($first: Int, $after: String, $last: Int, $before: String, $filter: ProjectFilter) {
    projects(first: $first, after: $after, last: $last, before: $before, filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          description
          client {
            name
            email
          }
          status
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
