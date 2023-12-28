import { UserStats } from "../shared/interfaces";
import { graphql as gql } from "react-relay";

export const USER_STATS = gql`
  query UserStats($id: ID!) {
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

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      username
      email
      role
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      photo
      role
    }
  }
`;
