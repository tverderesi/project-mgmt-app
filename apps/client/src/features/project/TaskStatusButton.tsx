import { useMutation } from "react-relay";
import { UPDATE_TASK } from "@/features/project/gql/project";
import { cn, statusDTO } from "@/lib/utils";
import { ArrowRightCircle, CheckCircle2, CircleDot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  projectUpdateTaskMutation,
  projectUpdateTaskMutation$data,
} from "@/features/project/gql/__generated__/projectUpdateTaskMutation.graphql";
import { ProjectTaskProps } from "./types/ProjectTaskProps";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { setNextStatus } from "@/validators/setNextStatus";

export function TaskStatusButton({ task }: { task: ProjectTaskProps }) {
  const [updateTask, isUpdateTaskInFlight] = useMutation<projectUpdateTaskMutation>(UPDATE_TASK);
  const updateTaskInRecord = (
    store: RecordSourceSelectorProxy<projectUpdateTaskMutation$data>,
    data: projectUpdateTaskMutation$data | null | undefined
  ) => {
    const taskInRecord = store.get(task.id);
    if (taskInRecord && data?.updateTask?.task?.status) {
      taskInRecord.setValue(data.updateTask?.task.status, "status");
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md",
              isUpdateTaskInFlight && "cursor-not-allowed pointer-events-none"
            )}
            onClick={(e) => {
              e.preventDefault();
              updateTask({
                variables: {
                  input: {
                    id: task.id,
                    status: setNextStatus(task.status),
                  },
                },
                updater: (store, data) => {
                  updateTaskInRecord(store, data);
                },
                optimisticUpdater: (store, data) => {
                  updateTaskInRecord(store, data);
                },
              });
            }}
          >
            {task.status === "NOT_STARTED" ? (
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
