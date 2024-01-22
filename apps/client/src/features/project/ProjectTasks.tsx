import { useFragment } from "react-relay";
import { PROJECT_TASKS_FRAGMENT } from "@/features/project/project";
import { projectTasks_tasks$key } from "@/features/project/__generated__/projectTasks_tasks.graphql";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { TaskBadge } from "./TaskBadge";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { ProjectStatusButton } from "./ProjectStatusButton";
import { CreateTaskForm } from "./CreateTaskForm";

export const status = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

export function ProjectTasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
  const projectID = useParams<{ id: string }>().id || "";
  const tasks = [...useFragment(PROJECT_TASKS_FRAGMENT, fragmentRef)];

  return (
    <div className="pb-16 space-y-2 px-3">
      <p className="text-2xl font-semibold">Tasks</p>

      <div>
        <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none first-of-type:border-b-0 only-of-type:rounded-lg only-of-type:border  rounded-lg h-16 w-full pr-10 pl-4">
          <CreateTaskForm />
        </div>
        {tasks &&
          tasks.map((task, index) => (
            <div
              className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full pl-3 pr-10
            flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through"
              key={index}
            >
              <ProjectStatusButton task={task} projectID={projectID} />
              <span className={cn("grow", task.status === "COMPLETED" && "line-through")}>{task.title}</span>
              <TaskBadge task={task} />
              <DeleteTaskButton task={task} projectID={projectID} />
            </div>
          ))}
      </div>
    </div>
  );
}
