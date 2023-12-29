import { CURRENT_USER } from "@/graphql/queries/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatName } from "@/lib/utils";
import { LogoutButton } from "../auth/LogoutButton";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";

const loadedQuery = loadQuery<{
  response: {
    currentUser: {
      name: string;
      photo: string;
    };
  };
  variables: Record<string, never>;
}>(RelayEnvironment, CURRENT_USER, {});

export const AvatarDropdown = () => {
  const {
    currentUser: { photo, name },
  } = usePreloadedQuery(CURRENT_USER, loadedQuery);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          {photo && <AvatarImage src={`data:image/png;base64,${photo}`} />}
          <AvatarFallback>{name?.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={5} className="mt-1">
        <DropdownMenuLabel>Hi, {formatName(name)}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
