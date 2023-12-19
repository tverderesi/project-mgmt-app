import { TypedDocumentNode, gql } from "@apollo/client";

export const CURRENT_USER: TypedDocumentNode<any> = gql`
  query CurrentUser {
    currentUser {
      id
      name
      username
      email
      photo
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
      password
      photo
      projects {
        id
        name
        status
        progress
        client {
          id
          name
        }
      }
      clients {
        id
        name
      }
      role
    }
  }
`;

interface TaskCount {
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  count: number;
}

interface UserStatsData {
  userStats: {
    projectCount: number;
    clientCount: number;
    taskCount: TaskCount[];
    totalTaskCount: number;
  };
}

interface UserStatsVariables {
  userStatsId: string;
}
export const USER_STATS: TypedDocumentNode<UserStatsData, UserStatsVariables> = gql`
  query UserStats($userStatsId: ID!) {
    userStats(id: $userStatsId) {
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
export const PROJECT: TypedDocumentNode<any> = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      progress
      autoProgress
      client {
        id
        name
        phone
        email
      }
      tasks {
        id
        name
        status
        progress
      }
    }
  }
`;
