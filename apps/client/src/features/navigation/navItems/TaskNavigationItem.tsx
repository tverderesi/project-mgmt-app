import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskCountWidget } from "../widgets/TaskCountWidget";
import { NavbarListItem } from "./NavbarListItem";

export function TaskNavigationItem({ taskCount }: { taskCount: any }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold bg-transparent">Tasks</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <TaskCountWidget fragmentRef={taskCount} />
            </Suspense>
          </li>
          <NavbarListItem to={"tasks/new"} title="New Task">
            Register a new Task.
          </NavbarListItem>
          <NavbarListItem to={`tasks`} title="Tasks">
            Browse and manage all Tasks.
          </NavbarListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
TaskNavigationItem.displayName = "TaskNavigationItem";
