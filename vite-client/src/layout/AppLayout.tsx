import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useApolloClient, useQuery, useSuspenseQuery } from "@apollo/client";
import { Suspense, useEffect } from "react";
import { USER_STATS, CURRENT_USER } from "../graphql/queries";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LOGOUT } from "@/graphql/mutations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatName, statusDTO } from "@/lib/utils";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { FolderOpen, List, Loader2, UserCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading, error } = useQuery(CURRENT_USER, {
    pollInterval: 60000,
    refetchWritePolicy: "merge",
  });

  useEffect(() => {
    if (error) navigate("../login");
    if (data?.currentUser === null) navigate("../login");

    if (data?.currentUser?.role) {
      const href = `/app/${data?.currentUser?.role.toLowerCase()}`;
      if (!location.pathname.split(href)[1]) navigate(`..${href}`);
      if (location.pathname.split(href)[1]) navigate(location.pathname);
    }
  }, [data, error]);

  const userRolePath = `./${data?.currentUser?.role?.toLowerCase()}`;

  return (
    <div className="h-full w-full p-2 lg:px-4 relative">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="fixed z-30 top-0 bg-background/80 -mx-4 border-b border-bottom border-border shadow-sm backdrop-blur w-screen h-16 flex flex-row items-center justify-between px-8">
          <ModeToggle />
          <NavigationMenuItem asChild className="font-bold ml-2">
            <Link to={`./${userRolePath}`}>mgmt.app</Link>
          </NavigationMenuItem>
          <div className="hidden  flex-grow max-w-full justify-center items-center md:flex flex-row">
            <NavigationMenu>
              <NavigationMenuList>
                <ProjectNavigationItem data={data} userRolePath={userRolePath} />
                <ClientNavigationItem data={data} userRolePath={userRolePath} />
                <TaskNavigationItem data={data} userRolePath={userRolePath} />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <AvatarDropdown />
        </div>
      </Suspense>
      {loading && <div>Loading...</div>}

      <Outlet />
    </div>
  );
};

const AvatarDropdown = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = client.onResetStore(() => new Promise(() => navigate("../login")));
    return () => {
      unsubscribe();
    };
  }, [client]);
  const { data } = useSuspenseQuery(CURRENT_USER);

  const [logout] = useMutation(LOGOUT);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          {data.currentUser?.photo && <AvatarImage src={`data:image/png;base64,${data.currentUser.photo}`} />}
          <AvatarFallback>{data.currentUser?.name.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={5} className="mt-1">
        <DropdownMenuLabel>Hi, {formatName(data?.currentUser?.name)}!</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            logout();
            client.resetStore();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

{
  /* <DropdownMenuTrigger asChild></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            logout();
            client.resetStore();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */
}

const ListItem = forwardRef<ElementRef<typeof Link>, ComponentPropsWithoutRef<typeof Link>>(
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
function ProjectNavigationItem({ data, userRolePath }: { data: any; userRolePath: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <ProjectCountArray id={data?.currentUser?.id} />
            </Suspense>
          </li>
          <ListItem to={`${userRolePath}/projects/new`} title="New Project">
            Create a new project.
          </ListItem>
          <ListItem to={`${userRolePath}/projects`} title="Projects">
            Browse and manage all projects.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function ProjectCountArray({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_STATS, {
    variables: { userStatsId: id },
  });
  return (
    <li className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 pl-3 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <FolderOpen className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">{data.userStats.projectCount} Projects</span>
    </li>
  );
}

function ClientNavigationItem({ data, userRolePath }: { data: any; userRolePath: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Clients</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <UserCountArray id={data?.currentUser?.id} />
            </Suspense>
          </li>
          <ListItem to={`${userRolePath}/clients/new`} title="New Client">
            Register a new client.
          </ListItem>
          <ListItem to={`${userRolePath}/clients`} title="Clients">
            Browse and manage all clients.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function UserCountArray({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_STATS, {
    variables: { userStatsId: id },
  });
  return (
    <li className="row-span-1 lg:row-span-3 lg:p-3 lg:bg-rose-500 pl-3 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <UserCircle2 className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {data.userStats.clientCount} Client{data.userStats.clientCount !== 1 && "s"}
      </span>
    </li>
  );
}

function TaskNavigationItem({ data, userRolePath }: { data: any; userRolePath: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-semibold">Tasks</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-72 md:w-[400px] lg:w-[500px] lg:grid-cols-[.5fr_1fr]">
          <li className="row-span-3 rounded-md flex flex-col items-center justify-center">
            <Suspense fallback={<Skeleton className=" w-full h-full" />}>
              <TaskCountArray id={data?.currentUser?.id} />
            </Suspense>
          </li>
          <ListItem to={`${userRolePath}/tasks/new`} title="New Task">
            Register a new Task.
          </ListItem>
          <ListItem to={`${userRolePath}/clients`} title="Tasks">
            Browse and manage all Tasks.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function TaskCountArray({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_STATS, {
    variables: { userStatsId: id },
  });
  return (
    <li className="row-span-1 lg:row-span-3 py-2 pb-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <div className="font-semibold text-sm lg:mt-1 flex flex-col items-center justify-around w-full h-full">
        {data.userStats.taskCount.map((task: any) => (
          <div className="space-y-2 w-full px-2">
            <span>
              {task.count} {statusDTO(task.status)}
            </span>
            <Progress key={task.id} value={Math.round(task.count / data.userStats.totalTaskCount)} className="w-full" />
          </div>
        ))}
      </div>
    </li>
  );
}
