import { useMutation } from "react-relay";
import { DELETE_TASK } from "@/features/project/gql/project";
import { Loader2, XCircle } from "lucide-react";
import { projectDeleteTaskMutation } from "../gql/__generated__/projectDeleteTaskMutation.graphql";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { getConnectionID } from "relay-runtime/lib/handlers/connection/ConnectionHandler";

export function DeleteTaskButton({ task, projectID }: { task: any; projectID: string }) {
  const { toast } = useToast();
  const [deleteTask, isInFlight] = useMutation<projectDeleteTaskMutation>(DELETE_TASK);
  const handleDeleteTask = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    const connectionId = getConnectionID(projectID, "project_taskEdge");
    deleteTask({
      variables: {
        input: {
          id: task.id,
        },
        connections: [connectionId],
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Task could not be deleted. Please try again.",
          variant: "destructive",
        });
      },
      onCompleted: (_, errors) => {
        if (errors && errors?.length > 0) {
          toast({
            title: "Error",
            description: "Task could not be deleted. Please try again.",
            variant: "destructive",
          });
        }
      },
      updater: (store) => {
        const taskId = store.get(task.id)?.getDataID();
        if (taskId) store.delete(taskId);
      },
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md">
            {isInFlight ? (
              <Loader2 className="h-8 w-8 animate-spin stroke-red-600" strokeWidth={1.2} />
            ) : (
              <XCircle className="w-8 h-8 stroke-red-600 cursor-pointer" strokeWidth={1.2} onClick={handleDeleteTask} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-2">Delete Task</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
