import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";

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
