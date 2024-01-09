import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { TaskNavigationItem } from "./nav-items";
import { ClientNavigationItem } from "./nav-items";
import { ProjectNavigationItem } from "./nav-items";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarDropdown } from "./AvatarDropdown";

export function Navbar() {
  const SuspenseAvatarDropDown = withSuspense(AvatarDropdown, <Skeleton className="w-10 h-10" />);
  return (
    <div className="fixed z-30 top-0 bg-background/80 -mx-4 border-b border-bottom border-border shadow-sm backdrop-blur w-screen h-16 flex flex-row items-center justify-between px-8">
      <ModeToggle />
      <NavigationMenuItem asChild className="font-bold ml-2">
        <Link to={""}>mgmt.app</Link>
      </NavigationMenuItem>
      <div className="hidden  flex-grow max-w-full justify-center items-center md:flex flex-row">
        <NavigationMenu>
          <NavigationMenuList>
            <ProjectNavigationItem />
            <ClientNavigationItem />
            <TaskNavigationItem />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <SuspenseAvatarDropDown />
    </div>
  );
}
Navbar.displayName = "Navbar";
