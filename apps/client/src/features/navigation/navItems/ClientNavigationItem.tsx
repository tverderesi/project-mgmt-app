import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientCountWidget } from "../widgets/ClientCountWidget";
import { NavbarListItem } from "./NavbarListItem";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ClientNavigationItemQuery } from "./__generated__/ClientNavigationItemQuery.graphql";
export const ClientNavigationItem = withSuspense(({ user }: { user: userUserQuery$data["user"] }) => {
  const { clientCount } = useLazyLoadQuery<ClientNavigationItemQuery>(
    graphql`
      query ClientNavigationItemQuery($user: ID) {
        clientCount(user: $user)
      }
    `,
    { user: user?.id }
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Clients</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <ClientCountWidget clientCount={clientCount} />
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
}, <Skeleton className=" w-full h-full" />);
