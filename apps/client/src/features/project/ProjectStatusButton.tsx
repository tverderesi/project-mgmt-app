import { useMutation } from "react-relay";
import { statusDTO } from "@/lib/utils";
import { ArrowRightCircle, CheckCircle2, CircleDot, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { projectUpdateTaskMutation } from "./__generated__/projectUpdateTaskMutation.graphql";
import { Status } from "./__generated__/projectProjectQuery.graphql";
import { status } from "./ProjectTasks";

export function ProjectStatusButton() {
  // const [updateTask, isUpdateTaskInFlight] = useMutation<projectUpdateTaskMutation>(UPDATE_TASK);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {/* <div
            className="p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md"
            onClick={(e) => {
              e.preventDefault();
              updateTask({
                variables: {
                  input: {
                    id: task.id,
                    status: status[
                      status.indexOf(task.status) === status.length - 1 ? 0 : status.indexOf(task.status) + 1
                    ] as Status,
                  },
                },

                updater: (store) => {
                  const updatedTask = store.getRootField("updateTask");

                  const tasks = store.get(projectID)?.getLinkedRecords("tasks");
                  if (tasks && updatedTask) {
                    store.get(projectID)?.setLinkedRecords(
                      tasks.map((taskRecord) => {
                        if (taskRecord.getValue("id") === updatedTask.getValue("id")) {
                          return updatedTask;
                        }
                        return taskRecord;
                      }),
                      "tasks"
                    );
                  }
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
          </div> */}
        </TooltipTrigger>
        {/* <TooltipContent>{statusDTO(task.status)}</TooltipContent> */}
      </Tooltip>
    </TooltipProvider>
  );
}
