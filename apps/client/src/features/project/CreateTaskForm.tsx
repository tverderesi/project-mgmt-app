import { useLazyLoadQuery, useMutation } from "react-relay";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statusDTO } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { projectCreateTaskMutation } from "./__generated__/projectCreateTaskMutation.graphql";
import { useParams } from "react-router-dom";
import { USER } from "@/graphql/queries/user";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { status } from "./ProjectTasks";
import { useToast } from "@/components/ui/use-toast";
import { RecordSourceSelectorProxy, graphql } from "relay-runtime";

export const CreateTaskForm = withSuspense(() => {
  const [createTask] = useMutation<projectCreateTaskMutation>(graphql`
    mutation CreateTaskFormMutation($input: TaskInput!) {
      createTask(input: $input) {
        id
        title
        description
        status
      }
    }
  `);
  const projectID = useParams<{ id: string }>().id || "";
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  const { toast } = useToast();

  const schema = z.object({
    title: z.string(),
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
    project: z.string(),
    user: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      status: "NOT_STARTED",
      project: projectID,
      user: user?.id || "",
    },
  });
  useEffect(() => {
    form.setValue("user", user?.id || "");
    form.setValue("project", projectID);
  }, [user?.id, projectID]);

  return (
    <Form {...form}>
      <form className="flex items-center justify-center gap-2 w-full h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            createTask({
              variables: {
                input: {
                  ...form.getValues(),
                },
              },
              onError: (error) => {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive",
                });
              },
              updater: (store: RecordSourceSelectorProxy, data) => {
                const newTask = store.getRootField("createTask");
                const createTask = data?.createTask;
                const project = store.get(projectID);
                const tasks = project?.getLinkedRecords("tasks");

                if (createTask && newTask) {
                  newTask.setValue(createTask.title, "title");
                  newTask.setValue(createTask.description, "description");
                  newTask.setValue(createTask.status, "status");
                }

                if (tasks && newTask) {
                  project?.setLinkedRecords([...tasks, newTask], "tasks");
                }
              },
            });
          }}
        >
          <PlusCircle className="w-8 h-8 " strokeWidth={1.2} />
        </Button>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input
              autoComplete="off"
              placeholder="New Task"
              className="border-b border-t-0 border-l-0 border-r-0 shadow-none rounded-none focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter" && form.getValues().title !== undefined) {
                  createTask({
                    variables: {
                      input: {
                        ...form.getValues(),
                      },
                    },
                    onCompleted: () => {
                      console.log("completed");
                    },
                    onError: (error) => {
                      console.log(error.message);
                    },
                    updater: (store, data) => {
                      const newTask = store.getRootField("createTask");
                      const createTask = store.getRoot().getLinkedRecord("createTask");
                      console.log(createTask);
                      newTask.setValue(data?.createTask.title, "title");
                      newTask.setValue(data?.createTask.description, "description");
                      newTask.setValue(data?.createTask.status, "status");
                      const project = store.get(projectID);
                      const tasks = project?.getLinkedRecords("tasks");
                      if (tasks && newTask) {
                        project?.setLinkedRecords([...tasks, newTask], "tasks");
                      }
                    },
                  });
                  e.currentTarget.value = "";
                  form.reset();
                  form.setValue("status", "NOT_STARTED");
                  e.preventDefault();
                }
                if (e.key === "Escape") {
                  e.currentTarget.value = "";
                }
              }}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
              <SelectTrigger className="border-b border-l-0 border-r-0 border-t-0 rounded-none focus:rounded w-36 shadow-none border-border font-semibold">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {status.map((status) => (
                  <SelectItem key={status} value={status}>
                    {statusDTO(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </form>
    </Form>
  );
}, <Skeleton className="flex items-center justify-center gap-2 w-full h-full -ml-4" />);
