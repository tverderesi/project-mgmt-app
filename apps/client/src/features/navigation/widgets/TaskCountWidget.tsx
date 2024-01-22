import { Progress } from "@/components/ui/progress";
import { statusDTO } from "@/lib/utils";
import { useFragment } from "react-relay";
import { TASK_COUNT_BY_STATUS_FRAGMENT } from "@/graphql/queries/user";
import { userTaskCountByStatus_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCountByStatus_TaskCount.graphql";

export function TaskCountWidget({ fragmentRef }: { fragmentRef: userTaskCountByStatus_TaskCount$key }) {
  const taskCount = useFragment<userTaskCountByStatus_TaskCount$key>(TASK_COUNT_BY_STATUS_FRAGMENT, fragmentRef);
  const totalTaskCount = taskCount?.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <span className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {taskCount.map((task) => (
          <div className="space-y-2 w-full px-2" key={task.status}>
            <span>
              {task.count} {statusDTO(task.status)}
            </span>
            <Progress value={Math.round((task.count * 100) / totalTaskCount)} className="w-full" />
          </div>
        ))}
      </div>
    </span>
  );
}
TaskCountWidget.displayName = "TaskCountWidget";
