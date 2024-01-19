import { ModeToggle } from "@/ui/mode-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/ui/navigation-menu";
import { Link } from "react-router-dom";
import { TaskNavigationItem } from "./navItems/TaskNavigationItem";
import { ClientNavigationItem } from "./navItems/ClientNavigationItem";
import { ProjectNavigationItem } from "./navItems/ProjectNavigationItem";
import { Skeleton } from "@/ui/skeleton";
import { AvatarDropdown } from "./AvatarDropdown";
import { cn } from "@/lib/utils";
import { h2, h4 } from "../../ui/typography";
import { Suspense } from "react";
import { MobileMenu } from "./mobileMenu/MobileMenu";
import { useLazyLoadQuery } from "react-relay";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";
import { userTaskCountByStatus_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCountByStatus_TaskCount.graphql";

export function Navbar() {
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

  const taskCountByStatus = user?.taskCountByStatus as userTaskCountByStatus_TaskCount$key;

  return (
    <div className="fixed z-30 top-0 bg-background/80 -mx-4 border-b border-bottom border-border shadow-sm backdrop-blur w-screen h-16 flex flex-row items-center justify-between px-8">
      <ModeToggle align="start" className="hidden md:inline-flex" />
      <NavigationMenuItem asChild className="font-bold ml-2">
        <Link to="" className={cn(h2, "border-none mt-1", `md:${h4}`)}>
          mgmt.app
        </Link>
      </NavigationMenuItem>
      <div className="hidden flex-grow max-w-full justify-center items-center md:flex flex-row">
        <NavigationMenu>
          <NavigationMenuList>
            <ProjectNavigationItem projectCount={user} />
            <ClientNavigationItem clientCount={user} />
            <TaskNavigationItem taskCount={taskCountByStatus} />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="hidden md:block">
        <Suspense fallback={<Skeleton className="w-10 h-10" />}>
          <AvatarDropdown />
        </Suspense>
      </div>
      <MobileMenu />
    </div>
  );
}

Navbar.displayName = "Navbar";
