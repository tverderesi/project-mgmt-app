import { GraphQLEnumType } from "graphql";
export const taskStatusType = new GraphQLEnumType({
  name: "TaskStatus",
  description: "The status of a Task.",
  values: {
    NOT_STARTED: { value: "NOT_STARTED" },
    IN_PROGRESS: { value: "IN_PROGRESS" },
    COMPLETED: { value: "COMPLETED" },
  },
});
