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
import { Link } from "react-router-dom";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export const loadedQuery = loadQuery<userMeQuery>(RelayEnvironment, ME, {});

export const AvatarDropdown = ({ align = "end" }: { align?: DropdownMenuContentProps["align"] }) => {
  const data = usePreloadedQuery(ME, loadedQuery);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          <AvatarFallback>{data?.me?.user?.name?.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} alignOffset={5} className="my-1">
        <DropdownMenuLabel>Hi, {data?.me?.user?.name ? formatName(data?.me?.user?.name as string) : ""}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">
          <Link to="settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="font-medium">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
