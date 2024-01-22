import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { CREATE_TASK, DELETE_TASK, PROJECT_TASKS_FRAGMENT, UPDATE_TASK } from "@/features/project/project";
import { projectTasks_tasks$key } from "@/features/project/__generated__/projectTasks_tasks.graphql";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, statusDTO } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, CheckCircle2, CircleDot, Loader2, PlusCircle, XCircle } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { projectCreateTaskMutation } from "./__generated__/projectCreateTaskMutation.graphql";
import { useParams } from "react-router-dom";
import { TASK_COUNT_BY_STATUS_FRAGMENT, USER } from "@/graphql/queries/user";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { useEffect, useState } from "react";
import { projectDeleteTaskMutation } from "./__generated__/projectDeleteTaskMutation.graphql";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { projectUpdateTaskMutation } from "./__generated__/projectUpdateTaskMutation.graphql";
import { Status } from "./__generated__/projectProjectQuery.graphql";
import {
  userTaskCount_taskCount$data,
  userTaskCount_taskCount$key,
} from "@/graphql/queries/__generated__/userTaskCount_taskCount.graphql";

const status = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

export function ProjectTasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
  const projectID = useParams<{ id: string }>().id || "";
  const tasks = [...useFragment(PROJECT_TASKS_FRAGMENT, fragmentRef)];
  const [deleteTask, isTaskInFlight] = useMutation<projectDeleteTaskMutation>(DELETE_TASK);

  return (
    <div className="pb-16 space-y-2 px-3">
      <p className="text-2xl font-semibold">Tasks</p>

      <div>
        <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none first-of-type:border-b-0 only-of-type:rounded-lg only-of-type:border  rounded-lg h-16 w-full pr-10 pl-4">
          <CreateTaskForm />
        </div>
        {tasks &&
          tasks.map((task, index) =>
            isTaskInFlight ? (
              <Skeleton className="h-16 w-full first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg " />
            ) : (
              <div
                className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full pl-3 pr-10
            flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through"
                key={index}
              >
                <ProjectStatusButton task={task} projectID={projectID} />

                <span className={cn("grow", task.status === "COMPLETED" && "line-through")}>{task.title}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    task.status === "NOT_STARTED" && "border-primary text-primary",
                    task.status === "IN_PROGRESS" && "border-yellow-500 text-yellow-500",
                    task.status === "COMPLETED" && "border-green-500 text-green-500"
                  )}
                >
                  {statusDTO(task.status)}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <XCircle
                        className="w-8 h-8 stroke-red-500 cursor-pointer"
                        strokeWidth={1.2}
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTask({
                            variables: {
                              id: task.id,
                            },

                            onError: (error) => {},
                            updater: (store) => {
                              const project = store.get(projectID);
                              const tasks = project?.getLinkedRecords("tasks");
                              if (tasks) {
                                project?.setLinkedRecords(
                                  tasks.filter((taskRecord) => taskRecord.getValue("id") !== task.id),
                                  "tasks"
                                );
                              }
                            },
                          });
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-col gap-2">Delete Task</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )
          )}
      </div>
    </div>
  );
}
function ProjectStatusButton({
  task,
  projectID,
}: {
  task: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly status: Status;
    readonly title: string;
    readonly " $fragmentType": "projectTasks_tasks";
  };
  projectID: string;
}) {
  const [updateTask, isUpdateTaskInFlight] = useMutation<projectUpdateTaskMutation>(UPDATE_TASK);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="p-1 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-ring rounded-md"
            onClick={(e) => {
              e.preventDefault();
              updateTask({
                variables: {
                  input: {
                    id: task.id,
                    status: status[
                      status.indexOf(task.status) === status.length - 1 ? 0 : status.indexOf(task.status) + 1
                    ] as Status,
                  },
                },

                updater: (store) => {
                  const updatedTask = store.getRootField("updateTask");

                  const tasks = store.get(projectID)?.getLinkedRecords("tasks");
                  if (tasks && updatedTask) {
                    store.get(projectID)?.setLinkedRecords(
                      tasks.map((taskRecord) => {
                        if (taskRecord.getValue("id") === updatedTask.getValue("id")) {
                          return updatedTask;
                        }
                        return taskRecord;
                      }),
                      "tasks"
                    );
                  }
                },
              });
            }}
          >
            {isUpdateTaskInFlight ? (
              <Loader2 className="h-8 w-8 animate-spin" strokeWidth={1.2} />
            ) : task.status === "NOT_STARTED" ? (
              <CircleDot className="w-8 h-8 " strokeWidth={1.2} />
            ) : task.status === "IN_PROGRESS" ? (
              <ArrowRightCircle className="w-8 h-8 stroke-yellow-500" strokeWidth={1.2} />
            ) : (
              <CheckCircle2 className="w-8 h-8 stroke-green-500" strokeWidth={1.2} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{statusDTO(task.status)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function CreateTaskForm() {
  const [createTask, isTaskInFlight] = useMutation<projectCreateTaskMutation>(CREATE_TASK);
  const [loading, setLoading] = useState(true);
  const projectID = useParams<{ id: string }>().id || "";
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

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
      <form
        className="flex items-center justify-center gap-2 w-full h-full"
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
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
                const createTask = data?.createTask;
                const project = store.get(projectID);
                const tasks = project?.getLinkedRecords("tasks");

                if (createTask) {
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
}
