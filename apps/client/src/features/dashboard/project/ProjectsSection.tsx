import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";
import { Suspense } from "react";
import { CardFallback } from "../shared/CardFallback";
import { Count } from "../shared/Count";
import { usePaginationFragment } from "react-relay";
import { PROJECT_FRAGMENT } from "@/graphql/queries/user";
import { ProjectCarouselItems } from "./ProjectCarouselItems";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { h2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function ProjectsSection({ fragmentRef }: { fragmentRef: userUserQuery$data["user"] }) {
  const { data, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, loadNext, loadPrevious, refetch } = usePaginationFragment(
    PROJECT_FRAGMENT,
    fragmentRef
  );
  return (
    <Card className="shadow-none  h-100 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-xl">
          Projects
          <CardDescription>
            <Suspense fallback={<span className="h-6 w-28 animate-pulse rounded-md bg-primary/10" />}>
              <Count thing={{ singular: "Project", plural: "Projects" }} count={fragmentRef?.projectCount as number} />
            </Suspense>
          </CardDescription>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 h-auto">
        <div className="flex w-full gap-3 overflow-x-scroll  snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
          <Suspense fallback={<CardFallback />}>
            <ProjectCarouselItems projects={data} />
            {hasNext && (
              <Card
                className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between hover:bg-primary/10 transition-all ease-in-out hover:cursor-pointer"
                onClick={() => {
                  loadNext(10);
                }}
              >
                <CardContent
                  className={cn("px-3 pb-1.5 h-max flex flex-col flex-grow justify-center items-center", isLoadingNext && "p-0")}
                >
                  {isLoadingNext ? (
                    <Loader2 className="h-20 w-20 animate-spin" strokeWidth={1} />
                  ) : (
                    <span className={cn(h2, "border-none")}>Load More Projects</span>
                  )}
                </CardContent>
              </Card>
            )}
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
