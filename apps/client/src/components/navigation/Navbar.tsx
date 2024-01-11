import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { TaskNavigationItem } from "./nav-items";
import { ClientNavigationItem } from "./nav-items";
import { ProjectNavigationItem } from "./nav-items";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarDropdown } from "./AvatarDropdown";
import { cn } from "@/lib/utils";
import { h2, h4 } from "../ui/typography";
import { Suspense } from "react";
import { MobileMenu } from "./MobileMenu";
import { useClientQuery, useLazyLoadQuery } from "react-relay";
import { ME, USER_QUERY } from "@/graphql/queries/user";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";

export function Navbar() {
  const { me } = useClientQuery<userMeQuery>(ME, {});
  const {
    user: { user },
  } = useLazyLoadQuery<userUserQuery>(USER_QUERY, { id: me?.user?.id || "" });
  const projects = user?.projects;
  const clients = user?.clients;
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
            <ProjectNavigationItem projects={projects} />
            <ClientNavigationItem clients={clients} />
            <TaskNavigationItem />
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
