import { useMutation } from "react-relay";
import { UPDATE_TASK } from "@/features/project/gql/project";
import { statusDTO } from "@/lib/utils";
import { ArrowRightCircle, CheckCircle2, CircleDot, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { projectUpdateTaskMutation, projectUpdateTaskMutation$data } from "./__generated__/projectUpdateTaskMutation.graphql";
import { status } from "./projectTasks/ProjectTasks";
import { ProjectTaskProps } from "./types/ProjectTaskProps";
import { RecordSourceSelectorProxy } from "relay-runtime";

export function ProjectStatusButton({ task }: { task: ProjectTaskProps }) {
  const [updateTask, isUpdateTaskInFlight] = useMutation<projectUpdateTaskMutation>(UPDATE_TASK);
  const updateTaskInRecord = (store: RecordSourceSelectorProxy<projectUpdateTaskMutation$data>) => {
    const taskInRecord = store.get(task.id);
    if (taskInRecord && task.status) {
      taskInRecord.setValue(
        status[status.indexOf(task.status) === status.length - 1 ? 0 : status.indexOf(task.status) + 1] as
          | "NOT_STARTED"
          | "IN_PROGRESS"
          | "COMPLETED",
        "status"
      );
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md"
            onClick={(e) => {
              e.preventDefault();
              updateTask({
                variables: {
                  input: {
                    id: task.id,
                    status: status[
                      status.indexOf(task.status || "NOT_STARTED") === status.length - 1
                        ? 0
                        : status.indexOf(task.status || "NOT_STARTED") + 1
                    ] as "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
                  },
                },
                updater: (store) => {
                  updateTaskInRecord(store);
                },
                optimisticUpdater: (store) => {
                  updateTaskInRecord(store);
                },
              });
            }}
          >
            {isUpdateTaskInFlight ? (
              <Loader2 className="h-8 w-8 animate-spin" strokeWidth={1.2} />
            ) : task.status === "NOT_STARTED" ? (
              <CircleDot className="w-8 h-8 " strokeWidth={1.2} />
            ) : task.status === "IN_PROGRESS" ? (
              <ArrowRightCircle className="w-8 h-8 stroke-yellow-500" strokeWidth={1.2} />
            ) : (
              <CheckCircle2 className="w-8 h-8 stroke-green-500" strokeWidth={1.2} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{statusDTO(task.status || "NOT_STARTED")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
