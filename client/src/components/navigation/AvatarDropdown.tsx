import { useSuspenseQuery } from "@apollo/client";
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

export const AvatarDropdown = () => {
  const {
    data: {
      currentUser: { photo, name },
    },
  } = useSuspenseQuery(CURRENT_USER);

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
