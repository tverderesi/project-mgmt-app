import { USER_STATS } from "@/graphql/queries/user";
import { statusDTO } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/hooks/suspense-hooks";
import { UserCircle2 } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { useLazyLoadQuery } from "react-relay";
import { Enum, statuses } from "./Enum";

export function TaskCountWidget() {
  const { id } = useCurrentUser();

  const {
    userStats: { taskCount, totalTaskCount },
  } = useLazyLoadQuery<{
    variables: { id: string };
    response: {
      userStats: {
        projectCount: number;
        clientCount: number;
        totalTaskCount: number;
        taskCount: {
          status: Enum<typeof statuses>;
          count: number;
        }[];
      };
    };
  }>(USER_STATS, { id });

  return (
    <li className="row-span-1 lg:row-span-3 py-2 pb-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {taskCount.map((task) => (
          <div className="space-y-2 w-full px-2">
            <span>
              {task.count} {statusDTO(task.status)}
            </span>
            <Progress key={task.status} value={Math.round(task.count / totalTaskCount)} className="w-full" />
          </div>
        ))}
      </div>
    </li>
  );
}
TaskCountWidget.displayName = "TaskCountWidget";

export function ClientCountWidget() {
  const { id } = useCurrentUser();
  const {
    userStats: { clientCount },
  } = useLazyLoadQuery<{
    variables: { id: string };
    response: {
      userStats: {
        clientCount: number;
        projectCount: number;
        totalTaskCount: number;
        taskCount: {
          status: Enum<typeof statuses>;
          count: number;
        }[];
      };
    };
  }>(USER_STATS, { id });

  return (
    <li className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 pl-3 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <UserCircle2 className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {clientCount} Client{clientCount !== 1 && "s"}
      </span>
    </li>
  );
}
ClientCountWidget.displayName = "ClientCountWidget";

export function ProjectCountWidget() {
  const { id } = useCurrentUser();
  const {
    userStats: { projectCount },
  } = useLazyLoadQuery<{
    variables: { id: string };
    response: {
      userStats: {
        projectCount: number;
        clientCount: number;
        totalTaskCount: number;
        taskCount: {
          status: Enum<typeof statuses>;
          count: number;
        }[];
      };
    };
  }>(USER_STATS, { id });
  return (
    <li className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 pl-3 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <FolderOpen className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">{projectCount} Projects</span>
    </li>
  );
}
ProjectCountWidget.displayName = "ProjectCountWidget";
