import { graphql } from "react-relay";

export const PROJECT_CLIENT_FRAGMENT = graphql`
  fragment projectClient_client on Client {
    name
    email
    phone
  }
`;

export const PROJECT_TASKS_FRAGMENT = graphql`
  fragment projectTasks_tasks on Task @relay(plural: true) {
    id
    name
    description
    status
  }
`;

export const PROJECT = graphql`
  query projectProjectQuery($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        ...projectClient_client
      }
      tasks {
        ...projectTasks_tasks
      }
    }
  }
`;
