import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { cn, toTitleCase } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewClient } from "./NewClient";
import projectV from "@/validators/project";
import { h2 } from "@/components/ui/typography";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import { USER } from "@/graphql/queries/user";
import { useEffect } from "react";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FormInput } from "@/components/FormInput";
import { ProjectStatusSelect } from "../features/project/ProjectFormStatusSelect";
import { ProjectFormClientCommand } from "../features/project/ProjectFormClientCommand";
import { FormTextarea } from "@/components/FormTextArea";

export const NewProject = () => {
  useSetPageTitle("mgmt.app - New Project");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectV.create>>({
    resolver: zodResolver(projectV.create),
    defaultValues: {
      name: "",
      description: "",
      status: "NOT_STARTED",
    },
  });

  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

  const status = projectV.create.shape.status.Values;
  const statusEnum = Object.values(status).map((status) => ({ value: status, label: toTitleCase(status) }));
  useEffect(() => {
    if (user.id) {
      form.setValue("user", user.id);
    }
  }, [user.id]);

  const [mutate, isInFlight] = useMutation(graphql`
    mutation NewProjectMutation($input: ProjectInput!) {
      createProject(input: $input) {
        id
        name
        description
        status
        client {
          id
          name
        }
      }
    }
  `);
  return (
    <Sheet>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutate({
              variables: {
                input: data,
              },
            });
            toast({
              title: "Success",
              description: "Project created successfully!",
            });
          })}
          className="h-full w-full pt-18 pb-2"
        >
          <Card className="min-h-[calc(100vh-6rem)] w-full flex flex-col justify-between">
            <CardHeader>
              <h2 className={cn(h2, "inline-flex gap-2 items-center mb-8 justify-center border-none")}>New Project</h2>
            </CardHeader>
            <div className="mx-auto grow basis-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0  md:gap-4 md:gap-x-8 max-w-screen-md">
                <FormInput form={form} label="Name" placeholder="Name" name="name" description="Insert the project name here." />
                <ProjectStatusSelect form={form} statusEnum={statusEnum} />
                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Description"
                  form={form}
                  description="Insert a brief description of the project, if you want."
                />
                <ProjectFormClientCommand form={form} user={user} />
              </div>
            </div>

            <CardFooter className="flex flex-col lg:flex-row justify-center gap-8 p-8">
              <Button
                className="gap-2 w-72 font-semibold"
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  form.reset({
                    user: user.id,
                  });
                }}
              >
                <RotateCcw className="h-4 w-4" />
                Reset Form
              </Button>
              <Button type="submit" className="gap-2 w-72 font-semibold" disabled={isInFlight}>
                {isInFlight ? <Loader2 className="animate-spin h-4 w-4" /> : <PlusCircle className="h-4 w-4" />} Create Project
              </Button>
            </CardFooter>

            <SheetContent className="max-md:w-screen">
              <NewClient asSideItem />
            </SheetContent>
          </Card>
        </form>
      </Form>
    </Sheet>
  );
};
