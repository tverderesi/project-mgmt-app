import { useFragment } from "react-relay";
import { PROJECT_TASKS_FRAGMENT } from "@/features/project/project";
import { Link } from "react-router-dom";
import { projectTasks_tasks$data, projectTasks_tasks$key } from "@/features/project/__generated__/projectTasks_tasks.graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, statusDTO } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle, CheckCircle2, CircleDot, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Task = Omit<projectTasks_tasks$data[number], " $fragmentType">;
const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 10,
  },
];
const status = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;

export function ProjectTasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
  const tasks = [...useFragment(PROJECT_TASKS_FRAGMENT, fragmentRef)];

  return (
    <div className="pb-16 space-y-2 px-3">
      <p className="text-2xl font-semibold">Tasks</p>

      <TaskList />
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState<{ title: string; status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" }[]>([]);
  const schema = z.object({
    title: z.string(),
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      status: "NOT_STARTED",
    },
  });

  return (
    <div>
      <div className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none first-of-type:border-b-0 only-of-type:rounded-lg only-of-type:border  rounded-lg h-16 w-full pr-10 pl-4">
        <Form {...form}>
          <form
            className="flex items-center justify-center gap-2 w-full h-full"
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            <Button variant="ghost" size="icon">
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
                      setTasks((tasks) => [...tasks, form.getValues()]);
                      e.currentTarget.value = "";
                      form.reset();
                      e.preventDefault();
                    }
                    if (e.key === "Escape") {
                      form.reset();
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="border-b border-l-0 border-r-0 border-t-0 rounded-none focus:rounded w-36 shadow-none border-border font-semibold">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].map((status) => (
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
      </div>
      {tasks &&
        tasks.map((task, index) => (
          <div
            className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border h-16 w-full pl-4 pr-10
            flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through"
            key={index}
          >
            <div
              onClick={(e) => {
                setTasks((tasks) => [
                  ...tasks.slice(0, index),
                  {
                    ...tasks[index],
                    status:
                      status[
                        status.indexOf(tasks[index].status) === status.length - 1 ? 0 : status.indexOf(tasks[index].status) + 1
                      ],
                  },
                  ...tasks.slice(index + 1),
                ]);
              }}
            >
              {task.status === "NOT_STARTED" ? (
                <CircleDot className="w-8 h-8 " strokeWidth={1.2} />
              ) : task.status === "IN_PROGRESS" ? (
                <ArrowRightCircle className="w-8 h-8 stroke-yellow-500" strokeWidth={1.2} />
              ) : task.status === "COMPLETED" ? (
                <CheckCircle2 className="w-8 h-8 stroke-green-500" strokeWidth={1.2} />
              ) : null}
            </div>

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
            <XCircle
              className="w-8 h-8 stroke-red-500 cursor-pointer"
              strokeWidth={1.2}
              onClick={() => setTasks((tasks) => [...tasks.slice(0, index), ...tasks.slice(index + 1)])}
            />
          </div>
        ))}
    </div>
  );
}
