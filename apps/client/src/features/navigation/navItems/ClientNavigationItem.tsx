import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientCountWidget } from "../widgets/ClientCountWidget";
import { NavbarListItem } from "./NavbarListItem";

export function ClientNavigationItem({ clientCount }: { clientCount: any }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold bg-transparent">Clients</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <ClientCountWidget fragmentRef={clientCount} />
            </Suspense>
          </li>
          <NavbarListItem to={"clients/new"} title="New Client">
            Register a new client.
          </NavbarListItem>
          <NavbarListItem to={`clients`} title="Clients">
            Browse and manage all clients.
          </NavbarListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
ClientNavigationItem.displayName = "ClientNavigationItem";
