import { CURRENT_USER } from "@/graphql/queries/user";
import { User } from "@/graphql/shared/interfaces";
import { useSuspenseQuery } from "@apollo/client";

export function useCurrentUser(): { rolePath: string } & User {
  const {
    data: { currentUser },
  } = useSuspenseQuery(CURRENT_USER);
  return { ...currentUser, rolePath: `app/${currentUser.role.toLowerCase()}` };
}
