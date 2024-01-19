import { TotalTaskCountWidget } from "@/features/navigation/widgets/TotalTaskCountWidget";
import { ProjectCountWidget } from "@/features/navigation/widgets/ProjectCountWidget";
import { ClientCountWidget } from "@/features/navigation/widgets/ClientCountWidget";
import { TaskCountWidget } from "@/features/navigation/widgets/TaskCountWidget";
import { useLazyLoadQuery } from "react-relay";
import { USER } from "@/graphql/queries/user";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { userTaskCountByStatus_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCountByStatus_TaskCount.graphql";
import { MobileMenuAccordionItemProps } from "./MobileMenuAccordionItem";

export function useMobileMenuItems() {
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  const taskCountByStatus = user?.taskCountByStatus as userTaskCountByStatus_TaskCount$key;
  const mobileMenuItems: MobileMenuAccordionItemProps[] = [
    {
      value: "projects",
      title: "Projects",
      fragmentRef: user,
      listItems: [
        {
          to: "projects/new",
          title: "New Project",
          description: "Register a new project.",
        },
        {
          to: "projects",
          title: "Projects",
          description: "Browse and manage all projects.",
        },
      ],
      Widget: ProjectCountWidget,
    },
    {
      value: "clients",
      title: "Clients",
      fragmentRef: user,
      listItems: [
        {
          to: "clients/new",
          title: "New Client",
          description: "Register a new Client.",
        },
        {
          to: "clients",
          title: "Clients",
          description: "Browse and manage all clients.",
        },
      ],
      Widget: ClientCountWidget,
    },
    {
      value: "tasks",
      title: "Tasks",
      fragmentRef: user,
      listItems: [
        {
          to: "tasks/new",
          title: "New Task",
          description: "Register a new Task.",
        },
        {
          to: "tasks",
          title: "Tasks",
          description: "Browse and manage all tasks.",
        },
      ],
      Widget: TotalTaskCountWidget,
      children: <TaskCountWidget fragmentRef={taskCountByStatus} />,
    },
  ];

  return mobileMenuItems;
}
