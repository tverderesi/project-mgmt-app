import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCountWidget } from "../widgets/ProjectCountWidget";
import { NavbarListItem } from "./NavbarListItem";

export function ProjectNavigationItem({ projectCount }: { projectCount: any }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold bg-transparent">Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <ProjectCountWidget fragmentRef={projectCount} />
            </Suspense>
          </li>
          <NavbarListItem to={`projects/new`} title="New Project">
            Create a new project.
          </NavbarListItem>
          <NavbarListItem to={`projects`} title="Projects">
            Browse and manage all projects.
          </NavbarListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
ProjectNavigationItem.displayName = "ProjectNavigationItem";
