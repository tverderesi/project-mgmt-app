import { ME } from "@/graphql/queries/user";

import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { userMeQuery, userMeQuery$data } from "@/graphql/queries/__generated__/userMeQuery.graphql";

export function useCurrentUser() {
  const queryReference = loadQuery<userMeQuery>(RelayEnvironment, ME, {});
  const { me } = usePreloadedQuery(ME, queryReference);
  return { ...me, rolePath: `app/${me?.role.toLowerCase()}` };
}
