import { gql } from "@apollo/client";

export const TASK_COUNT_FRAGMENT = gql`
  fragment TaskCountFragment on UserStats {
    totalTaskCount
    taskCount {
      status
      count
    }
  }
`;

export const PROJECT_COUNT_FRAGMENT = gql`
  fragment ProjectCountFragment on UserStats {
    projectCount
  }
`;

export const CLIENT_COUNT_FRAGMENT = gql`
  fragment ClientCountFragment on UserStats {
    clientCount
  }
`;

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    name
    email
    phone
  }
`;

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    name
    description
    progress
    status
    autoProgress
  }
`;
export const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    name
    description
    status
    progress
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    username
    email
    photo
    role
  }
`;
