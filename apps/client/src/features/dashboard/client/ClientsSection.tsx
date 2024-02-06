import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import { CardFallback } from "../shared/CardFallback";
import { Count } from "../shared/Count";
import { usePaginationFragment } from "react-relay";
import { CLIENT_FRAGMENT } from "@/graphql/queries/user";
import { ClientCarouselItems } from "./ClientCarouselItems";
import { Loader2 } from "lucide-react";
import { h2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function ClientsSection({ fragmentRef }: { fragmentRef: any }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(CLIENT_FRAGMENT, fragmentRef);

  return (
    <Card className="shadow-none h-100 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-xl">
          Clients
          <CardDescription>
            <Suspense fallback={<span className="h-6 w-28 animate-pulse rounded-md bg-primary/10" />}>
              <Count thing={{ singular: "Client", plural: "Clients" }} count={fragmentRef.clientCount} />
            </Suspense>
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 h-auto">
        <div className="flex w-full gap-3 overflow-x-scroll snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
          <Suspense fallback={<CardFallback />}>
            <ClientCarouselItems data={data} />
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
          <Link to="clients">
            <CardStackIcon className="h-4 w-4" />
            Browse Clients
          </Link>
        </Button>
        <Button variant="outline-rose" className="items-center gap-2 w-40" asChild>
          <Link to="clients/new">
            <PlusCircle className="h-4 w-4" />
            Create Client
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
ClientsSection.displayName = "ClientsSection";
