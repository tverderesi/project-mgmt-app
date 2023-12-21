import { ComponentPropsWithoutRef, ElementRef, Suspense, forwardRef } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCountWidget, TaskCountWidget, UserCountWidget } from "./widgets";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function TaskNavigationItem() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Tasks</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <TaskCountWidget />
            </Suspense>
          </li>
          <ListItem to={`/app/user/tasks/new`} title="New Task">
            Register a new Task.
          </ListItem>
          <ListItem to={`/app/user/clients`} title="Tasks">
            Browse and manage all Tasks.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
TaskNavigationItem.displayName = "TaskNavigationItem";

export function ClientNavigationItem() {
  const SuspenseUserCountWidget = withSuspense(UserCountWidget, <Skeleton className=" w-full h-full" />);
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Clients</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <SuspenseUserCountWidget />
          </li>
          <ListItem to={`/app/user/clients/new`} title="New Client">
            Register a new client.
          </ListItem>
          <ListItem to={`$/app/user/clients`} title="Clients">
            Browse and manage all clients.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
ClientNavigationItem.displayName = "ClientNavigationItem";

export function ProjectNavigationItem() {
  const SuspenseProjectCountWidget = withSuspense(ProjectCountWidget, <Skeleton className=" w-full h-full" />);
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <SuspenseProjectCountWidget />
          </li>
          <ListItem to={`/app/user/projects/new`} title="New Project">
            Create a new project.
          </ListItem>
          <ListItem to={`$/app/user/projects`} title="Projects">
            Browse and manage all projects.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
ProjectNavigationItem.displayName = "ProjectNavigationItem";

export const ListItem = forwardRef<ElementRef<typeof Link>, ComponentPropsWithoutRef<typeof Link>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
