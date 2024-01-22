import { cn, statusDTO } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Status } from "./__generated__/projectProjectQuery.graphql";

export function TaskBadge({
  task,
}: {
  task: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
    readonly " $fragmentType": "projectTasks_tasks";
  };
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        task.status === "NOT_STARTED" && "border-primary text-primary",
        task.status === "IN_PROGRESS" && "border-yellow-500 text-yellow-500",
        task.status === "COMPLETED" && "border-green-500 text-green-500"
      )}
    >
      {statusDTO(task.status)}
    </Badge>
  );
}
