import { ClientsSection } from "@/components/user-dashboard/client-components";
import { ProjectsSection } from "@/components/user-dashboard/project-components";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";
import { useLazyLoadQuery } from "react-relay";

export const Dashboard = () => {
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

  return (
    <div className="pt-18 space-y-4 pb-4">
      <ProjectsSection fragmentRef={user?.projects} />
      <ClientsSection fragmentRef={user?.clients} />
    </div>
  );
};
