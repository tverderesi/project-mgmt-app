import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon, EyeOpenIcon, PersonIcon, CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import { statusDTO } from "@/lib/utils";
import { Suspense } from "react";
import { CardFallback, Count } from "./shared";
import { useFragment } from "react-relay";
import { PROJECT_FRAGMENT } from "@/graphql/queries/user";
import { userProject_project$data } from "@/graphql/queries/__generated__/userProject_project.graphql";

export function NoProjectsCard() {
  return (
    <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between">
      <CardHeader className="p-3 pb-1.5">
        <CardTitle className="text-lg font-semibold inline-flex items-center gap-2 align-text-top text-rose-500 dark:text-rose-400">
          <AlertOctagon className="h-5 w-5" strokeWidth={2} /> No Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow font-normal text-muted-foreground text-sm">
        Start a new project by clicking on the button below.
      </CardContent>
      <CardFooter className="px-3 pb-3 flex flex-row justify-between items-center">
        <Button size="sm" variant="outline-rose" className="items-center gap-1" asChild>
          <Link to={`./projects/new`}>
            <PlusIcon /> New Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
NoProjectsCard.displayName = "NoProjectsCard";

//@ts-expect-error: Ignoring this error until I can figure out how to properly type this. TODO: Properly type fragmentRef
export function ProjectsSection({ fragmentRef }) {
  const data = useFragment(PROJECT_FRAGMENT, fragmentRef);
  return (
    <Card className="shadow-none dark:bg-accent/20 bg-stone-100/70 border-none  h-100 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-xl">
          Projects
          <CardDescription>
            <Suspense fallback={<span className="h-6 w-28 animate-pulse rounded-md bg-primary/10" />}>
              <Count thing={{ singular: "Project", plural: "Projects" }} count={data.length} />
            </Suspense>
          </CardDescription>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 h-auto">
        <div className="flex w-full gap-3 overflow-x-scroll  snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
          <Suspense fallback={<CardFallback />}>
            <ProjectCarouselItems projects={data} />
          </Suspense>
        </div>
      </CardContent>
      <CardFooter className="gap-2 justify-end">
        <Button variant="outline-rose" className="items-center gap-2 w-40" asChild>
          <Link to="projects">
            <CardStackIcon className="h-4 w-4" />
            Browse Projects
          </Link>
        </Button>
        <Button variant="outline-rose" className="items-center gap-2 w-40" asChild>
          <Link to="projects/new">
            <PlusCircle className="h-4 w-4" />
            Create Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

ProjectsSection.displayName = "ProjectsSection";

const ProjectCarouselItems = ({ projects }: { projects: userProject_project$data }) => {
  const projectCount = projects.length;
  if (projectCount === 0) {
    return <NoProjectsCard />;
  }

  return (
    <>
      {projects.map((project) => {
        return (
          <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between" key={project.id}>
            <CardHeader className="p-3 pb-1.5">
              <CardTitle className="text-lg">
                {project.name}
                <Badge className="float-right mt-1">{statusDTO(project.status)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow">
              {/* <span className="gap-3 text-base">
                <PersonIcon className="inline-block mb-1.5 h-5 w-5" /> {project.client.name}
              </span> */}
            </CardContent>
            <CardFooter className="p-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline-rose" asChild>
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
    </>
  );
};