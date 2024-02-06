import { usePaginationFragment } from "react-relay";
import { PROJECT_TASKS_FRAGMENT } from "@/features/project/project";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { TaskBadge } from "./TaskBadge";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { ProjectStatusButton } from "./ProjectStatusButton";
import { CreateTaskForm } from "./CreateTaskForm";
import { h2 } from "@/components/ui/typography";
import { projectTasks_Connection$key, projectTasks_Connection$data } from "./__generated__/projectTasks_Connection.graphql";

export const status = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

export type ProjectTaskProps = NonNullable<
  NonNullable<NonNullable<projectTasks_Connection$data["taskEdge"]["edges"]>[number]>["node"]
>;

export function ProjectTasks({ fragmentRef }: { fragmentRef: any }) {
  const projectID = useParams<{ id: string }>().id || "";
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<any, projectTasks_Connection$key>(
    PROJECT_TASKS_FRAGMENT,
    fragmentRef
  );
  const edges = data?.taskEdge?.edges;

  return (
    <div className="pb-16 space-y-2 px-3">
      <p className="text-2xl font-semibold">Tasks</p>

      <div>
        <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none first-of-type:border-b-0 only-of-type:rounded-lg only-of-type:border  rounded-lg h-16 w-full pr-10 pl-4">
          <CreateTaskForm fragmentRef={fragmentRef} />
        </div>
        {edges &&
          edges.map((edge) => {
            if (!edge) return null;
            if (!edge.node) return null;
            const { node, cursor } = edge;

            return (
              <div
                className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full pl-3 pr-10
            flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through"
                key={cursor}
              >
                <ProjectStatusButton task={node} />
                <span className={cn("grow", node.status === "COMPLETED" && "line-through")}>{node.title}</span>
                <TaskBadge task={node} />
                <DeleteTaskButton task={node} projectID={projectID} />
              </div>
            );
          })}
        {hasNext && (
          <div
            className={cn(
              "border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full pl-3 pr-10 flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-lg cursor-pointer",
              isLoadingNext && "cursor-not-allowed pointer-events-none"
            )}
            onClick={() => {
              loadNext(10);
            }}
          >
            <span className={cn(h2 && "border-none")}>Load More Tasks</span>
          </div>
        )}
      </div>
    </div>
  );
}
