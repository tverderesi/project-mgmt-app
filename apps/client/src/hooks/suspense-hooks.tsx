import { CURRENT_USER } from "@/graphql/queries/user";
import { User } from "@/graphql/shared/interfaces";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";

export function useCurrentUser(): { rolePath: string } & User {
  const currentUserQuery = loadQuery<{ variables: Record<string, never>; response: { currentUser: User } }>(
    RelayEnvironment,
    CURRENT_USER,
    {}
  );

  const { currentUser } = usePreloadedQuery(CURRENT_USER, currentUserQuery);

  return { ...currentUser, rolePath: `app/${currentUser.role.toLowerCase()}` };
}
