import { graphql } from "react-relay";

export const PROJECT_CLIENT_FRAGMENT = graphql`
  fragment projectClient_client on Client {
    name
    email
    phone
  }
`;

export const PROJECT_TASKS_FRAGMENT = graphql`
  fragment projectTasks_Connection on Project
  @refetchable(queryName: "projectTasks_ConnectionQuery")
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }, last: { type: "Int" }, before: { type: "String" }) {
    taskEdge(first: $first, after: $after, last: $last, before: $before) @connection(key: "project_taskEdge") {
      edges {
        node {
          id
          title
          description
          status
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const PROJECT = graphql`
  query projectProjectQuery($id: String!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        ...projectClient_client
      }
      ...projectTasks_Connection
    }
  }
`;

export const CREATE_TASK = graphql`
  mutation projectCreateTaskMutation($input: CreateTaskInput!, $connections: [ID!]!) {
    createTask(input: $input) {
      taskEdge @appendEdge(connections: $connections) {
        node {
          id
          title
          description
          status
        }
        cursor
      }
    }
  }
`;

export const UPDATE_TASK = graphql`
  mutation projectUpdateTaskMutation($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      taskEdge {
        node {
          id
          title
          description
          status
        }
      }
    }
  }
`;

export const DELETE_TASK = graphql`
  mutation projectDeleteTaskMutation($input: DeleteTaskInput!, $connections: [ID!]!) {
    deleteTask(input: $input) {
      taskEdge @deleteEdge(connections: $connections) {
        node {
          id
          title
          description
          status
        }
        cursor
      }
    }
  }
`;
