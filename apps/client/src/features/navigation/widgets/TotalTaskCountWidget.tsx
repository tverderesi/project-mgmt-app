import { BadgeCheck } from "lucide-react";
import { useFragment } from "react-relay";
import { TASK_COUNT_FRAGMENT } from "@/graphql/queries/user";
import { userTaskCount_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCount_TaskCount.graphql";

export function TotalTaskCountWidget({ fragmentRef }: { fragmentRef: userTaskCount_TaskCount$key }) {
  const { taskCount } = useFragment<userTaskCount_TaskCount$key>(TASK_COUNT_FRAGMENT, fragmentRef);
  const totalTaskCount = taskCount?.TOTAL;
  return (
    <span className="row-span-1 lg:row-span-3 text-rose-600 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <BadgeCheck className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {totalTaskCount} Task{totalTaskCount !== 1 && "s"}
      </span>
    </span>
  );
}
TotalTaskCountWidget.displayName = "TotalTaskCountWidget";
