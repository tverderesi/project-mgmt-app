import { graphql } from "react-relay";

export const USER_STATS = graphql`
  query userUserStatsQuery($id: ID!) {
    user(id: $id) {
      projectCount
      clientCount
      totalTaskCount
      taskCountByStatus {
        status
        count
      }
    }
  }
`;

export const ME = graphql`
  query userMeQuery {
    me {
      id
      name
      username
      email
      role
    }
  }
`;

export const USER = graphql`
  query userUserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      role
      projects {
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
      }
      clients {
        id
        name
      }
    }
  }
`;
