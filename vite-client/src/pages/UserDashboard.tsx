import { CURRENT_USER } from "@/graphql/queries";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useLazyQuery, useQuery } from "@apollo/client";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardStackIcon, EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { USER } from "@/graphql/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { statusDTO } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const UserDashboard = () => {
  type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    photo: string;
    projects?: {
      name: string;
    }[];
    clients?: {
      name: string;
    }[];
    role: string;
  };
  type CurrentUser = {
    currentUser: User;
  };

  const { data: currentUser } = useQuery(CURRENT_USER);
  const [user, { data, loading, error }] = useLazyQuery(USER, {});

  useEffect(() => {
    if (currentUser && !data) {
      const id = (currentUser as CurrentUser).currentUser.id;
      user({ variables: { id } });
    }
  }, [currentUser, data, user]);

  useEffect(() => {}, [data]);
  return (
    <div className="pt-16">
      <Projects data={data} loading={loading} error={error} />
    </div>
  );
};

const Projects = ({ data, loading, error }: { data: any; loading: boolean; error: any }) => {
  return (
    <Card className="shadow-none dark:bg-accent/20 bg-stone-100/70 border-none  h-100 flex flex-col justify-center">
      {loading && <Skeleton className="h-full w-full" />}
      {error && <div>{error.message}</div>}
      {data && (
        <div className="h-full w-full ">
          <CardHeader>
            <CardTitle className="text-xl">Projects</CardTitle>
            {data.user.projectCount > 0 && <CardDescription> {data.user.projects.length} Projects</CardDescription>}
          </CardHeader>

          <CardContent className="px-6 h-auto">
            <div className="h-full w-full bg-red-500"></div>
            <div className="flex w-full gap-3 overflow-x-scroll  snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
              {data.user.projectCount === 0 && <p>You don't have any projects yet!</p>}
              {data.user.projects.map((project: any) => {
                return (
                  <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between" key={project.id}>
                    <CardHeader className="p-3 pb-1.5">
                      <CardTitle className="text-lg">
                        {project.name}
                        <Badge className="float-right mt-1">{statusDTO(project.status)}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow">
                      <span className="gap-3 text-base">
                        <PersonIcon className="inline-block mb-1.5 h-5 w-5" /> {project.client.name}
                      </span>
                    </CardContent>
                    <CardFooter className="px-3 pb-3 flex flex-row justify-between items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="outline" asChild>
                              <Link to={`./projects/${project.id}`}>
                                <EyeOpenIcon />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Project</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="gap-2 flex flex-row justify-end">
            <Button
              className="font-semibold shadow-none hover:bg-slate-600 hover:text-secondary dark:hover:bg-slate-600 dark:hover:text-secondary-foreground dark:hover:border-slate-600"
              variant="outline"
              asChild
            >
              <Link to="projects">
                <span className="flex flex-row items-center">
                  <CardStackIcon className="h-4 w-4 me-2" />
                  <span className="pb-[1px]">Browse All Projects</span>
                </span>
              </Link>
            </Button>
            <Button
              className="font-semibold  hover:bg-emerald-700 hover:text-secondary dark:text-secondary-foreground dark:hover:border-emerald-700 shadow-none"
              variant="outline"
              asChild
            >
              <Link to="projects/new">
                <span className="flex flex-row items-center">
                  <PlusCircle className="h-4 w-4 me-2" />
                  <span className="pb-[1px]">Create Project</span>
                </span>
              </Link>
            </Button>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};
