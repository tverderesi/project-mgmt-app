import { TypedDocumentNode, gql } from "@apollo/client";
import { Project } from "../shared/interfaces";
import { z } from "zod";
import { createProjectValidator } from "@/validators/project";

export const CREATE_PROJECT: TypedDocumentNode<
  Omit<Project, "client" | "tasks">,
  { input: z.infer<typeof createProjectValidator> }
> = gql`
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
