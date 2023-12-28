import { TypedDocumentNode, gql } from "@apollo/client";
import { Project, QueryByUserId } from "@/graphql/shared/interfaces";

export const PROJECT: TypedDocumentNode<{ project: Project }, QueryByUserId> = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      progress
      autoProgress
      client {
        ...ClientFragment
      }
      tasks {
        ...TaskFragment
      }
    }
  }
`;
