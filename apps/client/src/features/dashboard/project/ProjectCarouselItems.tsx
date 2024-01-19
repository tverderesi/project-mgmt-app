import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { statusDTO } from "@/lib/utils";
import { userProject_project$data } from "@/graphql/queries/__generated__/userProject_project.graphql";
import { NoProjectsCard } from "./NoProjectsCard";

export const ProjectCarouselItems = ({ projects }: { projects: userProject_project$data }) => {
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
            <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow"></CardContent>
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
