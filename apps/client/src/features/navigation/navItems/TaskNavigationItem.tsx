import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskCountWidget } from "../widgets/TaskCountWidget";
import { NavbarListItem } from "./NavbarListItem";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { graphql, useLazyLoadQuery } from "react-relay";
import { TaskNavigationItemQuery } from "./__generated__/TaskNavigationItemQuery.graphql";
export const TaskNavigationItem = withSuspense(({ user }: { user: userUserQuery$data["user"] }) => {
  const { taskCountByStatus } = useLazyLoadQuery<TaskNavigationItemQuery>(
    graphql`
      query TaskNavigationItemQuery($user: ID) {
        taskCountByStatus(user: $user) {
          COMPLETED
          IN_PROGRESS
          NOT_STARTED
          TOTAL
        }
      }
    `,
    { user: user?.id }
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Tasks</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <TaskCountWidget taskCountByStatus={taskCountByStatus} />
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
}, <Skeleton className=" w-full h-full" />);
