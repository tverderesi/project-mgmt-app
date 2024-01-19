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
import { Link } from "react-router-dom";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { useLazyLoadQuery } from "react-relay";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";

export const AvatarDropdown = ({ align = "end" }: { align?: DropdownMenuContentProps["align"] }) => {
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="float-right">
          <AvatarFallback>{user?.name.split("")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} alignOffset={5} className="my-1">
        <DropdownMenuLabel>Hi, {user?.name ? formatName(user?.name as string) : ""}!</DropdownMenuLabel>
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
