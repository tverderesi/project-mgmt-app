import { UserCircle2 } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { statusDTO } from "@/lib/utils";
export function TaskCountWidget() {
  const taskCount = [
    { status: "NOT_STARTED", count: 3 },
    { status: "IN_PROGRESS", count: 14 },
    { status: "COMPLETED", count: 3 },
  ];
  return (
    <li className="row-span-1 lg:row-span-3 py-2 pb-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {taskCount.map((task) => (
          <div className="space-y-2 w-full px-2">
            <span>
              {task.count} {statusDTO(task.status)}
            </span>
            <Progress value={10} className="w-full" />
          </div>
        ))}
      </div>
    </li>
  );
}
TaskCountWidget.displayName = "TaskCountWidget";

export function ClientCountWidget() {
  const clientCount = Math.floor(Math.random() * 100);
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
  const projectCount = Math.floor(Math.random() * 100);
  return (
    <li className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 pl-3 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <FolderOpen className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">{projectCount} Projects</span>
    </li>
  );
}
ProjectCountWidget.displayName = "ProjectCountWidget";
