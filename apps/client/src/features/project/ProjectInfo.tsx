import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { PROJECT, UPDATE_PROJECT } from "@/features/project/gql/project";
import { useNavigate, useParams } from "react-router-dom";
import { projectProjectQuery } from "@/features/project/gql/__generated__/projectProjectQuery.graphql";
import { ProjectClientInfo } from "@/features/project/ProjectClientInfo";
import { ProjectDescriptionInfo } from "@/features/project/ProjectDescriptionInfo";
import { ProjectTasks } from "@/features/project/projectTasks/ProjectTasks";
import { useContext, useEffect } from "react";
import projectV from "@/validators/project";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import { z } from "zod";
import { ProjectInfoStatusBadge } from "./ProjectInfoStatusBadge";
import { EditModeContext } from "@/lib/EditModeProvider";
import { EditModeButton } from "@/components/EditModeButton";
import { projectUpdateMutation } from "./gql/__generated__/projectUpdateMutation.graphql";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export const ProjectInfo = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectV.update>>({
    resolver: zodResolver(projectV.create),
  });
  const { editMode, setEditMode } = useContext(EditModeContext);
  const id = useParams<{ id: string }>()?.id;
  const navigate = useNavigate();

  if (!id) {
    navigate("/404");
    return null;
  }

  const { project } = useLazyLoadQuery<projectProjectQuery>(PROJECT, { id });

  useEffect(() => {
    if (project?.name) {
      document.title = `mgmt.app - ${project?.name}`;
    }
  }, [project]);

  useEffect(() => {
    if (editMode && project) {
      form.reset({
        name: project?.name as string,
        description: project?.description as string,
        status: project?.status as "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
      });
    }
  }, [editMode]);

  const [updateProject, isUpdatingInFlight] =
    useMutation<projectUpdateMutation>(UPDATE_PROJECT);
  const handleUpdateProject = () => {
    updateProject({
      variables: {
        input: {
          id: project?.id as string,
          name: form.getValues("name"),
          description: form.getValues("description"),
          status: form.getValues("status"),
        },
      },
      onCompleted: (_, errors) => {
        if (errors) {
          toast({
            title: "Error",
            description:
              "Something went wrong updating the project. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        setEditMode(false);
      },
      updater: (store, data) => {
        const project = store.get(id);
        const newProject = data?.updateProject?.project;
        if (project && newProject) {
          project.setValue(newProject.name, "name");
          project.setValue(newProject.description, "description");
        }
      },
      optimisticUpdater: (store) => {
        const project = store.get(id);
        if (project) {
          project.setValue(form.getValues("name"), "name");
          project.setValue(form.getValues("description"), "description");
        }
      },
    });
  };
  return (
    <Card className="shadow-none min-h-96 border-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((e) => console.log(e))}>
          <CardHeader className="flex flex-row gap-4 items-center flex-wrap">
            {editMode ? (
              <FormInput
                name="name"
                disabled={!editMode}
                form={form}
                placeholder={project?.name as string}
                className="flex-grow disbaled:opacity-100 disabled:text-foreground disabled:border-0 transition-all ease-in-out"
                inputClassName="space-y-2 border-t-0 rounded-none font-semibold border-x-0 border-b border-border shadow-none h-16  text-4xl  focus-visible:ring-0 focus:outline-none px-0 disabled:opacity-100 disabled:text-foreground disabled:border-0 transition-all ease-in-out disabled:cursor-default"
              />
            ) : (
              <CardTitle className="flex flex-grow py-1 space-y-2 font-semibold  h-16 text-4xl px-0">
                {project?.name}
              </CardTitle>
            )}

            <ProjectInfoStatusBadge project={project} form={form} />
            <EditModeButton thing="Project" />
            {editMode && (
              <Button
                type="submit"
                onClick={handleUpdateProject}
                disabled={isUpdatingInFlight}
                size="sm"
                className="disabled:opacity-100 disabled:text-foreground disabled:border-0 transition-all ease-in-out"
              >
                Save
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-16">
            <p className="text-3xl font-semibold px-3 -mb-8">Info</p>
            <ProjectDescriptionInfo
              description={project?.description}
              form={form}
            />
            <ProjectClientInfo fragmentRef={project?.client} />
          </CardContent>
        </form>
      </Form>
      <CardContent className={editMode ? "blur pointer-events-none" : ""}>
        <ProjectTasks fragmentRef={project} />
      </CardContent>
    </Card>
  );
};
