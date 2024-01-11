import { ClientsSection } from "@/components/user-dashboard/client-components";
import { ProjectsSection } from "@/components/user-dashboard/project-components";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { ME, USER_QUERY } from "@/graphql/queries/user";
import { AuthError } from "@/lib/utils";
import { useClientQuery, useLazyLoadQuery } from "react-relay";

export const Dashboard = () => {
  const { me } = useClientQuery<userMeQuery>(ME, {});
  const {
    user: { user, error },
  } = useLazyLoadQuery<userUserQuery>(USER_QUERY, { id: me?.user?.id || "" });

  if (error?.type === "AUTH_ERROR_UNAUTHENTICATED") {
    throw new AuthError(error.type, error.message);
  }

  return (
    <div className="pt-18 space-y-4 pb-4">
      <ProjectsSection fragmentRef={user?.projects} />
      <ClientsSection fragmentRef={user?.clients} />
    </div>
  );
};
