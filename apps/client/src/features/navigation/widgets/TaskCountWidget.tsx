import { Progress } from "@/components/ui/progress";
import { statusDTO } from "@/lib/utils";
import { useFragment } from "react-relay";
import { TASK_COUNT_FRAGMENT } from "@/graphql/queries/user";
import { userTaskCount_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCount_TaskCount.graphql";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

export const TaskCountWidget = withSuspense(({ fragmentRef }: { fragmentRef: userTaskCount_TaskCount$key }) => {
  const { taskCount } = useFragment<userTaskCount_TaskCount$key>(TASK_COUNT_FRAGMENT, fragmentRef);
  if (!taskCount) {
    throw new Error("TaskCountWidget: taskCount is undefined");
  }
  return (
    <span className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {Object.keys(taskCount)
          .filter((status) => status !== "TOTAL")
          .map((status) => {
            const totalTaskCount = taskCount.TOTAL as number;
            const count = taskCount[status as keyof typeof taskCount] as number;

            return (
              <div className="space-y-2 w-full px-2" key={status as string}>
                <span>
                  {count} {statusDTO(status)}
                </span>
                <Progress
                  value={Math.round(count * 100) / totalTaskCount}
                  className="w-full dark:bg-background/30"
                  indicatorClassName="bg-primary dark:bg-background"
                />
              </div>
            );
          })}
      </div>
    </span>
  );
}, <Skeleton className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full" />);
