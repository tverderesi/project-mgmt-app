import { graphql } from "relay-runtime";

export const CREATE_PROJECT = graphql`
  mutation projectCreateProjectMutation($input: ProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      status
    }
  }
`;
