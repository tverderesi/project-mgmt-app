import { TypedDocumentNode, gql } from "@apollo/client";
import {
  PROJECT_COUNT_FRAGMENT,
  CLIENT_COUNT_FRAGMENT,
  TASK_COUNT_FRAGMENT,
  CLIENT_FRAGMENT,
  PROJECT_FRAGMENT,
  USER_FRAGMENT,
} from "../fragments/user";
import { UserStats, QueryByUserId, User } from "../shared/interfaces";

export const USER_STATS: TypedDocumentNode<{ userStats: UserStats }, QueryByUserId> = gql`
  query UserStats($id: ID!) {
    userStats(id: $id) {
      ...ProjectCountFragment
      ...ClientCountFragment
      ...TaskCountFragment
    }
  }
  ${PROJECT_COUNT_FRAGMENT}
  ${CLIENT_COUNT_FRAGMENT}
  ${TASK_COUNT_FRAGMENT}
`;

export const CLIENT_COUNT_BY_USER: TypedDocumentNode<{ userStats: Pick<UserStats, "clientCount"> }, QueryByUserId> = gql`
  query UserStats($id: ID!) {
    userStats(id: $id) {
      ...ClientCountFragment
    }
  }
  ${CLIENT_COUNT_FRAGMENT}
`;

export const PROJECT_COUNT_BY_USER: TypedDocumentNode<{ userStats: Pick<UserStats, "projectCount"> }, QueryByUserId> = gql`
  query UserStats($id: ID!) {
    userStats(id: $id) {
      ...ProjectCountFragment
    }
  }
  ${PROJECT_COUNT_FRAGMENT}
`;

export const TASK_COUNT: TypedDocumentNode<{ userStats: Pick<UserStats, "totalTaskCount" | "taskCount"> }, QueryByUserId> = gql`
  query UserStats($id: ID!) {
    userStats(id: $id) {
      ...TaskCountFragment
    }
  }
  ${TASK_COUNT_FRAGMENT}
`;

export const CURRENT_USER: TypedDocumentNode<{ currentUser: User }> = gql`
  query CurrentUser {
    currentUser {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER: TypedDocumentNode<{ user: User }, QueryByUserId> = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      photo
      projects {
        ...ProjectFragment
      }
      clients {
        ...ClientFragment
      }
      role
    }
  }
  ${PROJECT_FRAGMENT}
  ${CLIENT_FRAGMENT}
`;
