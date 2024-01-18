import { graphql } from "react-relay";

export const TASK_COUNT_BY_STATUS_FRAGMENT = graphql`
  fragment userTaskCountByStatus_TaskCount on TaskCountByStatus @relay(plural: true) {
    status
    count
  }
`;

export const TOTAL_TASK_COUNT_FRAGMENT = graphql`
  fragment userTaskCount_taskCount on User {
    totalTaskCount
  }
`;

export const CLIENT_COUNT_FRAGMENT = graphql`
  fragment userClientCount_clientCount on User {
    clientCount
  }
`;

export const PROJECT_COUNT_FRAGMENT = graphql`
  fragment userProjectCount_projectCount on User {
    projectCount
  }
`;
export const PROJECT_FRAGMENT = graphql`
  fragment userProject_project on Project @relay(plural: true) {
    id
    name
    description
    status
  }
`;

export const CLIENT_FRAGMENT = graphql`
  fragment userClient_client on Client @relay(plural: true) {
    id
    name
    email
    phone
  }
`;

export const USER = graphql`
  query userUserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      projects {
        ...userProject_project
      }
      clients {
        id
      }
      ...userProjectCount_projectCount
      ...userClientCount_clientCount
      ...userTaskCount_taskCount
      taskCountByStatus {
        ...userTaskCountByStatus_TaskCount
      }
    }
  }
`;
