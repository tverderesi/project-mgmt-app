import { ClientsSection } from "@/features/dashboard/client/ClientsSection";
import { ProjectsSection } from "@/features/dashboard/project/ProjectsSection";
import { userClient_client$key } from "@/graphql/queries/__generated__/userClient_client.graphql";
import { userProject_project$key } from "@/graphql/queries/__generated__/userProject_project.graphql";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { useLazyLoadQuery } from "react-relay";

export const Dashboard = () => {
  useSetPageTitle("mgmt.app - Dashboard");

  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  const projects = user.projects as userProject_project$key;
  const clients = user.clients as userClient_client$key;

  return (
    <div className="pt-18 space-y-4 pb-4">
      <ProjectsSection fragmentRef={projects} />
      <ClientsSection fragmentRef={clients} />
    </div>
  );
};
