import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      username
      email
      photo
      role
    }
  }
`;
export const LOGOUT = gql`
  mutation Mutation {
    logout
  }
`;
export const SIGN_UP = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      username
      email
      photo
      role
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      phone
      name
      email
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      progress
      status
    }
  }
`;
