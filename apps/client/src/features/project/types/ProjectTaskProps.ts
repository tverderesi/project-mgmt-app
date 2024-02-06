import { projectTasks_Connection$data } from "../__generated__/projectTasks_Connection.graphql";

export type ProjectTaskProps = NonNullable<
  NonNullable<NonNullable<projectTasks_Connection$data["taskEdge"]["edges"]>[number]>["node"]
>;
