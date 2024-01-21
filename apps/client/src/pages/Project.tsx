import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectInfo } from "../features/project/ProjectInfo";

export const Project = () => {
  return (
    <div className="pt-16 flex flex-col gap-4">
      <Suspense fallback={<Skeleton className="h-screen" />}>
        <ProjectInfo />
      </Suspense>
    </div>
  );
};
