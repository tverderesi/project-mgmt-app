import { FolderOpen } from "lucide-react";
import { useFragment } from "react-relay";
import { PROJECT_COUNT_FRAGMENT } from "@/graphql/queries/user";
import { userProjectCount_projectCount$key } from "@/graphql/queries/__generated__/userProjectCount_projectCount.graphql";

export function ProjectCountWidget({ fragmentRef }: { fragmentRef: userProjectCount_projectCount$key }) {
  const data = useFragment<userProjectCount_projectCount$key>(PROJECT_COUNT_FRAGMENT, fragmentRef);
  const projectCount = data?.projectCount;

  return (
    <span className="row-span-1 lg:row-span-3 text-rose-600 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <FolderOpen className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {projectCount} Project{projectCount !== 1 && "s"}
      </span>
    </span>
  );
}
ProjectCountWidget.displayName = "ProjectCountWidget";
