import { Progress } from "@/components/ui/progress";
import { statusDTO } from "@/lib/utils";
import { TaskNavigationItemQuery$data } from "../navItems/__generated__/TaskNavigationItemQuery.graphql";

export function TaskCountWidget({ taskCountByStatus }: { taskCountByStatus: TaskNavigationItemQuery$data["taskCountByStatus"] }) {
  const { TOTAL, ...taskCount } = taskCountByStatus;
  return (
    <span className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {Object.keys(taskCount).map((status) => (
          <div className="space-y-2 w-full px-2" key={status}>
            <span>
              {taskCount[status as keyof typeof taskCount]} {statusDTO(status)}
            </span>
            <Progress value={Math.round((taskCount[status as keyof typeof taskCount] * 100) / TOTAL)} className="w-full" />
          </div>
        ))}
      </div>
    </span>
  );
}
TaskCountWidget.displayName = "TaskCountWidget";
