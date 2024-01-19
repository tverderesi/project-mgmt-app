import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import { CardFallback } from "../shared/CardFallback";
import { Count } from "../shared/Count";
import { useFragment } from "react-relay";
import { PROJECT_FRAGMENT } from "@/graphql/queries/user";
import { userProject_project$key } from "@/graphql/queries/__generated__/userProject_project.graphql";
import { ProjectCarouselItems } from "./ProjectCarouselItems";

export function ProjectsSection({ fragmentRef }: { fragmentRef: userProject_project$key }) {
  const data = useFragment(PROJECT_FRAGMENT, fragmentRef);
  return (
    <Card className="shadow-none  h-100 flex flex-col justify-center">
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
