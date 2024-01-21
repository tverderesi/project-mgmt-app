import { useFragment } from "react-relay";
import { PROJECT_TASKS_FRAGMENT } from "@/features/project/project";
import { Link } from "react-router-dom";
import { projectTasks_tasks$data, projectTasks_tasks$key } from "@/features/project/__generated__/projectTasks_tasks.graphql";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Task = Omit<projectTasks_tasks$data[number], " $fragmentType">;
const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 10,
  },
];

export function ProjectTasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
  const tasks = [...useFragment(PROJECT_TASKS_FRAGMENT, fragmentRef)];

  return (
    <div className="pb-16 space-y-2">
      <p className="text-2xl font-semibold px-3">Tasks</p>
      {tasks.length === 0 && (
        <>
          <p className="text-justify text-lg font-light px-3">
            No tasks provided.{" "}
            <Link to="../tasks/new" className="text-primary underline-offset-4 hover:underline">
              Create a new task now.
            </Link>
          </p>
        </>
      )}
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
