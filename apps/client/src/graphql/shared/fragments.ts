import { graphql as gql } from "relay-runtime";
const TASK_COUNT_FRAGMENT = gql`
  fragment TaskCountFragment on UserStats {
    totalTaskCount
    taskCount {
      status
      count
    }
  }
`;

const PROJECT_COUNT_FRAGMENT = gql`
  fragment ProjectCountFragment on UserStats {
    projectCount
  }
`;

const CLIENT_COUNT_FRAGMENT = gql`
  fragment ClientCountFragment on UserStats {
    clientCount
  }
`;

const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    name
    email
    phone
  }
`;

const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    name
    description
    progress
    status
    autoProgress
  }
`;
const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    name
    description
    status
    progress
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    username
    email
    photo
    role
  }
`;
