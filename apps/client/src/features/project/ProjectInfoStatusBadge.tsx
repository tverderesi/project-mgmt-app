import { cn, statusDTO } from "@/lib/utils";
import { graphql, useMutation } from "react-relay";
import { projectProjectQuery$data } from "./gql/__generated__/projectProjectQuery.graphql";
import { Button } from "@/components/ui/button";
import projectV from "@/validators/project";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ProjectInfoStatusMutation } from "./__generated__/ProjectInfoStatusMutation.graphql";
import { setNextStatus } from "@/validators/setNextStatus";

export function ProjectInfoStatusBadge({
  project,
  form,
}: {
  project: projectProjectQuery$data["project"];
  form: UseFormReturn<z.infer<typeof projectV.update>>;
}) {
  const [updateStatus, isUpdatingInFlight] = useMutation<ProjectInfoStatusMutation>(graphql`
    mutation ProjectInfoStatusBadgeMutation($input: UpdateProjectInput!) {
      updateProject(input: $input) {
        project {
          id
          status
        }
      }
    }
  `);

  const handleUpdate = () => {
    updateStatus({
      variables: {
        input: {
          id: project?.id as string,
          status: setNextStatus(project?.status as string),
        },
      },
      onCompleted: (_, errors) => {
        if (errors) {
          toast({
            title: "Error",
            description: "Cannot update status right now, please try again later.",
            variant: "destructive",
          });
          return;
        }
        form.setValue("status", setNextStatus(project?.status as string));
      },
      updater: (store, data) => {
        if (data?.updateProject?.project?.status) {
          const projectRecord = store.get(project?.id as string);
          projectRecord?.setValue(data.updateProject.project.status, "status");
        }
      },
      optimisticUpdater: (store) => {
        const projectRecord = store.get(project?.id as string);
        projectRecord?.setValue(setNextStatus(project?.status as string), "status");
      },
    });
  };
  return (
    <Button
      className={cn(
        "font-semibold transition-all ease-in-out",
        project?.status === "IN_PROGRESS" && "bg-yellow-600 hover:bg-yellow-500",
        project?.status === "COMPLETED" && "bg-green-600 hover:bg-green-500"
      )}
      size="sm"
      disabled={isUpdatingInFlight}
      onClick={handleUpdate}
    >
      {project?.status && statusDTO(project?.status)}
    </Button>
  );
}
