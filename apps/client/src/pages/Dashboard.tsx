import { ClientsSection } from "@/features/dashboard/client/ClientsSection";
import { ProjectsSection } from "@/features/dashboard/project/ProjectsSection";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { useLazyLoadQuery } from "react-relay";

export const Dashboard = () => {
  useSetPageTitle("mgmt.app - Dashboard");

  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  return (
    <div className="pt-18 space-y-4 pb-4">
      <ProjectsSection fragmentRef={user} />
      <ClientsSection fragmentRef={user} />
    </div>
  );
};
