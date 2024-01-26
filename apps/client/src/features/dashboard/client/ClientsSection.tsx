import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import { CardFallback } from "../shared/CardFallback";
import { Count } from "../shared/Count";
// @ts-ignore
import { ClientCarouselItems } from "./ClientCarouselItems";

export function ClientsSection() {
  return (
    <Card className="shadow-none h-100 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-xl">
          Clients
          <CardDescription>
            <Suspense fallback={<span className="h-6 w-28 animate-pulse rounded-md bg-primary/10" />}>
              <Count thing={{ singular: "Client", plural: "Clients" }} count={10} />
            </Suspense>
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 h-auto">
        <div className="flex w-full gap-3 overflow-x-scroll snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
          <Suspense fallback={<CardFallback />}>{/* <ClientCarouselItems clients={data} /> */}</Suspense>
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
