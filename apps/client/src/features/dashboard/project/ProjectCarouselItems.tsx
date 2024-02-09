import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, statusDTO } from "@/lib/utils";
import { NoProjectsCard } from "./NoProjectsCard";
import { userProject_ProjectConnection$data } from "@/graphql/queries/__generated__/userProject_ProjectConnection.graphql";
import { AxeIcon } from "lucide-react";

export const ProjectCarouselItems = ({
  data,
  count,
}: {
  data: userProject_ProjectConnection$data | null | undefined;
  count: number | null | undefined;
}) => {
  if (count === 0) {
    return <NoProjectsCard />;
  }

  const edges = data?.projectEdge?.edges || [];

  return (
    <>
      {edges.map((edge) => {
        const node = edge?.node;
        if (!node) return null;

        const project = node;
        return (
          <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between" key={project.id}>
            <CardHeader className="p-3 pb-1.5">
              <CardTitle className="text-lg">
                {project.name}
                <Badge
                  className={cn(
                    "float-right mt-1",
                    project.status == "IN_PROGRESS" && "bg-yellow-600",
                    project.status == "COMPLETED" && "bg-green-600"
                  )}
                >
                  {statusDTO(project.status || "NOT_STARTED")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow gap-1">
              {/* TODO: Add Info bits here */}
              <span className="inline-flex gap-2 items-center">
                <AxeIcon className="h-4 w-4" /> Info Line 1
              </span>
              <span className="inline-flex gap-2 items-center">
                <AxeIcon className="h-4 w-4" /> Info Line 2
              </span>
              <span className="inline-flex gap-2 items-center">
                <AxeIcon className="h-4 w-4" /> Info Line 3
              </span>
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
