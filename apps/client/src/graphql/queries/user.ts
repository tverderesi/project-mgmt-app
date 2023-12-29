import { graphql } from "react-relay";

export const USER_STATS = graphql`
  query userUserStatsQuery($id: ID!) {
    userStats(id: $id) {
      projectCount
      clientCount
      totalTaskCount
      taskCount {
        status
        count
      }
    }
  }
`;

export const CURRENT_USER = graphql`
  query userCurrentUserQuery {
    currentUser {
      ... on User {
        id
        name
        username
        email
        role
      }
      ... on ErrorArray {
        errors {
          path
          message
        }
      }
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
      photo
      role
      projects {
        id
        name
        description
        progress
        status
        autoProgress
        client {
          id
          name
          email
          phone
        }
      }
    }
  }
`;
