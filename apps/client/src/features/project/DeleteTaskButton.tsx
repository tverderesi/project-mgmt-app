import { Loader2, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function DeleteTaskButton() {
  // const [deleteTask, isInFlight] = useMutation<projectDeleteTaskMutation>(DELETE_TASK);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md">
            {/* {isInFlight ? (
              <Loader2 className="h-8 w-8 animate-spin stroke-red-600" strokeWidth={1.2} />
            ) : (
              <XCircle
                className="w-8 h-8 stroke-red-600 cursor-pointer"
                strokeWidth={1.2}
                onClick={(e) => {
                  e.preventDefault();
                  deleteTask({
                    variables: {
                      id: task.id,
                    },

                    updater: (store) => {
                      const project = store.get(projectID);
                      const tasks = project?.getLinkedRecords("tasks");
                      if (tasks) {
                        project?.setLinkedRecords(
                          tasks.filter((taskRecord) => taskRecord.getValue("id") !== task.id),
                          "tasks"
                        );
                      }
                    },
                  });
                }}
              />
            )} */}
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-2">Delete Task</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
