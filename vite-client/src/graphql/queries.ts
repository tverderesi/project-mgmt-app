import { TypedDocumentNode, gql } from "@apollo/client";

export const CURRENT_USER = gql`
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
      projectCount
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
