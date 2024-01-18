import { BadgeCheck, UserCircle2 } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { statusDTO } from "@/lib/utils";
import { useFragment } from "react-relay";
import {
  CLIENT_COUNT_FRAGMENT,
  PROJECT_COUNT_FRAGMENT,
  TASK_COUNT_BY_STATUS_FRAGMENT,
  TOTAL_TASK_COUNT_FRAGMENT,
} from "@/graphql/queries/user";
import { userProjectCount_projectCount$key } from "@/graphql/queries/__generated__/userProjectCount_projectCount.graphql";
import { userClientCount_clientCount$key } from "@/graphql/queries/__generated__/userClientCount_clientCount.graphql";
import { userTaskCountByStatus_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCountByStatus_TaskCount.graphql";
import { userTaskCount_taskCount$key } from "@/graphql/queries/__generated__/userTaskCount_taskCount.graphql";
export function TaskCountWidget({ fragmentRef }: { fragmentRef: userTaskCountByStatus_TaskCount$key }) {
  const taskCount = useFragment<userTaskCountByStatus_TaskCount$key>(TASK_COUNT_BY_STATUS_FRAGMENT, fragmentRef);
  const totalTaskCount = taskCount?.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <span className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {taskCount.map((task) => (
          <div className="space-y-2 w-full px-2">
            <span>
              {task.count} {statusDTO(task.status)}
            </span>
            <Progress value={Math.round(task.count / totalTaskCount)} className="w-full" />
          </div>
        ))}
      </div>
    </span>
  );
}
TaskCountWidget.displayName = "TaskCountWidget";

export function ClientCountWidget({ fragmentRef }: { fragmentRef: userClientCount_clientCount$key }) {
  const data = useFragment<userClientCount_clientCount$key>(CLIENT_COUNT_FRAGMENT, fragmentRef);
  const clientCount = data?.clientCount;
  return (
    <span className="row-span-1 lg:row-span-3 text-rose-600 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <UserCircle2 className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {clientCount} Client{clientCount !== 1 && "s"}
      </span>
    </span>
  );
}
ClientCountWidget.displayName = "ClientCountWidget";

export function ProjectCountWidget({ fragmentRef }: { fragmentRef: userProjectCount_projectCount$key }) {
  const data = useFragment<userProjectCount_projectCount$key>(PROJECT_COUNT_FRAGMENT, fragmentRef);
  const projectCount = data?.projectCount;

  return (
    <span className="row-span-1 lg:row-span-3 text-rose-600 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <FolderOpen className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {projectCount} Project{projectCount !== 1 && "s"}
      </span>
    </span>
  );
}
ProjectCountWidget.displayName = "ProjectCountWidget";

export function TotalTaskCountWidget({ fragmentRef }: { fragmentRef: userTaskCount_taskCount$key }) {
  const data = useFragment<userTaskCount_taskCount$key>(TOTAL_TASK_COUNT_FRAGMENT, fragmentRef);
  console.log(data);
  const totalTaskCount = data.totalTaskCount;
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
