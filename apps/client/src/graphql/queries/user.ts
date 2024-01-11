import { graphql } from "react-relay";
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
export const ME = graphql`
  query userMeQuery {
    me {
      user {
        id
        role
        name
      }
      error {
        message
        type
      }
    }
  }
`;

export const USER_QUERY = graphql`
  query userUserQuery($id: ID!) {
    user(id: $id) {
      user {
        name
        username
        email
        projects {
          ...userProject_project
        }
        clients {
          ...userClient_client
        }
      }
      error {
        message
        type
      }
    }
  }
`;
