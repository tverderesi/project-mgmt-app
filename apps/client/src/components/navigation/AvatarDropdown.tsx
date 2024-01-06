import { ME } from "@/graphql/queries/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatName } from "@/lib/utils";
import { LogoutButton } from "../auth/LogoutButton";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";

export const loadedQuery = loadQuery<userMeQuery>(RelayEnvironment, ME, {});

export const AvatarDropdown = () => {
  const data = usePreloadedQuery(ME, loadedQuery);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          <AvatarFallback>{data?.me?.name?.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={5} className="mt-1">
        <DropdownMenuLabel>Hi, {formatName(data?.me?.name as string)}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
