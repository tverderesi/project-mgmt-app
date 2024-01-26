import { Suspense } from "react";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCountWidget } from "../widgets/ProjectCountWidget";
import { NavbarListItem } from "./NavbarListItem";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ProjectNavigationItemQuery } from "./__generated__/ProjectNavigationItemQuery.graphql";

export const ProjectNavigationItem = withSuspense(({ user }: { user: userUserQuery$data["user"] }) => {
  const { projectCount } = useLazyLoadQuery<ProjectNavigationItemQuery>(
    graphql`
      query ProjectNavigationItemQuery($user: ID) {
        projectCount(user: $user)
      }
    `,
    { user: user?.id }
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <ProjectCountWidget projectCount={projectCount} />
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
}, <Skeleton className=" w-full h-full" />);
