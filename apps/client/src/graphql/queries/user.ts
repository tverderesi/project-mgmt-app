import { graphql } from "react-relay";

export const TASK_COUNT_FRAGMENT = graphql`
  fragment userTaskCount_TaskCount on User @refetchable(queryName: "userTaskCount_TaskCountQuery") {
    taskCount {
      NOT_STARTED
      IN_PROGRESS
      COMPLETED
      TOTAL
    }
  }
`;

export const CLIENT_COUNT_FRAGMENT = graphql`
  fragment userClientCount_clientCount on User @refetchable(queryName: "userClientCount_clientCountQuery") {
    clientCount
  }
`;

export const PROJECT_COUNT_FRAGMENT = graphql`
  fragment userProjectCount_projectCount on User @refetchable(queryName: "userProjectCount_projectCountQuery") {
    projectCount
  }
`;
export const PROJECT_FRAGMENT = graphql`
  fragment userProject_ProjectConnection on User
  @refetchable(queryName: "userProject_ProjectConnectionQuery")
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }, last: { type: "Int" }, before: { type: "String" }) {
    projectEdge(first: $first, after: $after, last: $last, before: $before) @connection(key: "user_projectEdge") {
      edges {
        node {
          id
          name
          description
          createdAt
          updatedAt
          status
        }
      }
    }
  }
`;

export const CLIENT_FRAGMENT = graphql`
  fragment userClient_Connection on User
  @refetchable(queryName: "userClient_ConnectionQuery")
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }, last: { type: "Int" }, before: { type: "String" }) {
    clientEdge(first: $first, after: $after, last: $last, before: $before) @connection(key: "User_clientEdge") {
      edges {
        node {
          id
          name
          email
          phone
        }
      }
    }
  }
`;

export const USER = graphql`
  query userUserQuery($id: String!) {
    user(id: $id) {
      id
      name
      username
      email
      createdAt
      updatedAt
      projectCount
      clientCount
      ...userProject_ProjectConnection
      ...userClient_Connection
      ...userProjectCount_projectCount
      ...userClientCount_clientCount
      ...userTaskCount_TaskCount
    }
  }
`;
