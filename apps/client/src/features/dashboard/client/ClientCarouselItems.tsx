import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { userClient_client$data } from "@/graphql/queries/__generated__/userClient_client.graphql";
import { NoClientsCard } from "./NoClientsCard";

export const ClientCarouselItems = ({ clients }: { clients: userClient_client$data }) => {
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
