import { usePaginationFragment } from "react-relay";
import { PROJECT_TASKS_FRAGMENT } from "@/features/project/gql/project";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { CreateTaskForm } from "./CreateTaskForm";
import { h2 } from "@/components/ui/typography";
import { projectTasks_Connection$key } from "@/features/project/gql/__generated__/projectTasks_Connection.graphql";
import { useEffect, useState } from "react";
import { SingleProjectTask } from "./SingleProjectTask";
import { ProjectTaskProps } from "../types/ProjectTaskProps";
export function ProjectTasks({ fragmentRef }: { fragmentRef: any }) {
  const projectID = useParams<{ id: string }>().id || "";

  const [areAllNodesNull, setAreAllNodesNull] = useState<boolean | null | undefined>(null);

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<any, projectTasks_Connection$key>(
    PROJECT_TASKS_FRAGMENT,
    fragmentRef
  );
  const nodes = data?.taskEdge?.edges?.map((edge) => edge?.node);
  useEffect(() => {
    const areAllNodesNull = !!nodes?.every((node) => node === null);
    setAreAllNodesNull(areAllNodesNull);
  }, [nodes]);

  return (
    <div className="pb-16 space-y-2 px-3">
      <p className="text-2xl font-semibold">Tasks</p>

      <div>
        <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none first-of-type:border-b-0 only-of-type:rounded-lg only-of-type:border  rounded-lg h-16 w-full pr-10 pl-4">
          <CreateTaskForm />
        </div>

        {(areAllNodesNull || !nodes) && (
          <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full flex items-center justify-between gap-4 text-muted-foreground rounded-lg">
            <span className="border-none w-full text-center px-8">
              No Tasks present. You can add a new task using the form above.
            </span>
          </div>
        )}
        {nodes && nodes.map((node) => <SingleProjectTask node={node as ProjectTaskProps} projectID={projectID} />)}
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
