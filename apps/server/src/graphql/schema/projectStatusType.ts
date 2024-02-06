import { GraphQLEnumType } from "graphql";
export const projectStatusType = new GraphQLEnumType({
  name: "ProjectStatus",
  description: "The status of the project.",
  values: {
    NOT_STARTED: { value: "NOT_STARTED" },
    IN_PROGRESS: { value: "IN_PROGRESS" },
    COMPLETED: { value: "COMPLETED" },
  },
});
