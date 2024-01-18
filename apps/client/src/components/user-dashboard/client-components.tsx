import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStackIcon, EyeOpenIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { AlertOctagon, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import { CardFallback, Count } from "./shared";
import { useFragment } from "react-relay";
import { CLIENT_FRAGMENT } from "@/graphql/queries/user";
import { userClient_client$data, userClient_client$key } from "@/graphql/queries/__generated__/userClient_client.graphql";

export function NoClientsCard() {
  return (
    <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between">
      <CardHeader className="p-3 pb-1.5">
        <CardTitle className="text-lg font-semibold inline-flex items-center gap-2 align-text-top text-rose-500 dark:text-rose-400">
          <AlertOctagon className="h-5 w-5" strokeWidth={2} /> No Clients
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow font-normal text-muted-foreground text-sm">
        Add a new client by clicking on the button below.
      </CardContent>
      <CardFooter className="px-3 pb-3 flex flex-row justify-between items-center">
        <Button size="sm" variant="outline-rose" className="items-center gap-1" asChild>
          <Link to={`./clients/new`}>
            <PlusIcon /> New Client
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
NoClientsCard.displayName = "NoProjectsCard";

export function ClientsSection({ fragmentRef }: { fragmentRef: userClient_client$key }) {
  const data = useFragment(CLIENT_FRAGMENT, fragmentRef);
  return (
    <Card className="shadow-none dark:bg-accent/20 bg-stone-100/70 border-none  h-100 flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-xl">
          Clients
          <CardDescription>
            <Suspense fallback={<span className="h-6 w-28 animate-pulse rounded-md bg-primary/10" />}>
              <Count thing={{ singular: "Client", plural: "Clients" }} count={data.length} />
            </Suspense>
          </CardDescription>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 h-auto">
        <div className="flex w-full gap-3 overflow-x-scroll  snap-proximity snap-x scroll-smooth scroll-ps-3 pb-4">
          <Suspense fallback={<CardFallback />}>
            <ClientCarouselItems clients={data} />
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
            New Client
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

ClientsSection.displayName = "ClientsSection";

const ClientCarouselItems = ({ clients }: { clients: userClient_client$data }) => {
  const clientCount = clients.length;
  if (clientCount === 0) {
    return <NoClientsCard />;
  }

  return (
    <>
      {clients.map((client) => {
        return (
          <Card className="w-48 h-48 shrink-0 overflow-hidden snap-start flex-col flex justify-between" key={client.id}>
            <CardHeader className="p-3 pb-1.5"></CardHeader>
            <CardContent className="px-3 pb-1.5 h-max flex flex-col justify-start flex-grow">
              <span className="gap-3 text-base">
                <PersonIcon className="inline-block mb-1.5 h-5 w-5" /> {client.name}
              </span>
              <span className="gap-3 text-base">
                <Phone className="inline-block mb-1.5 h-5 w-5" /> {client.phone}
              </span>
              <span className="gap-3 text-base">
                <Mail className="inline-block mb-1.5 h-5 w-5" /> {client.email}
              </span>
            </CardContent>
            <CardFooter className="p-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline-rose" asChild>
                      <Link to={`./clients/${client.id}`}>
                        <EyeOpenIcon />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Client</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};
