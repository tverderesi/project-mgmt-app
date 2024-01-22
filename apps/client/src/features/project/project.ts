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
    title
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

export const CREATE_TASK = graphql`
  mutation projectCreateTaskMutation($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK = graphql`
  mutation projectUpdateTaskMutation($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      status
    }
  }
`;

export const DELETE_TASK = graphql`
  mutation projectDeleteTaskMutation($id: ID!) {
    deleteTask(id: $id)
  }
`;
