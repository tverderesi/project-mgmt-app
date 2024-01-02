import { CURRENT_USER } from "@/graphql/queries/user";
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
import {
  userCurrentUserQuery$data,
  userCurrentUserQuery$variables,
} from "@/graphql/queries/__generated__/userCurrentUserQuery.graphql";

const loadedQuery = loadQuery<{
  response: userCurrentUserQuery$data;
  variables: userCurrentUserQuery$variables;
}>(RelayEnvironment, CURRENT_USER, {});

export const AvatarDropdown = () => {
  const data = usePreloadedQuery(CURRENT_USER, loadedQuery);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          <AvatarFallback>{data?.currentUser?.currentUser?.name?.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={5} className="mt-1">
        <DropdownMenuLabel>Hi, {formatName(data?.currentUser?.currentUser?.name as string)}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
