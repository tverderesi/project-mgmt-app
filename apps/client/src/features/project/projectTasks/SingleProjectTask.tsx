import { cn } from "@/lib/utils";
import { TaskBadge } from "./TaskBadge";
import { DeleteTaskButton } from "./ProjectTaskDeleteButton";
import { TaskStatusButton } from "../TaskStatusButton";
import { Suspense, useState } from "react";
import { UPDATE_TASK } from "@/features/project/gql/project";
import { useMutation } from "react-relay";
import {
  projectUpdateTaskMutation,
  projectUpdateTaskMutation$data,
} from "../gql/__generated__/projectUpdateTaskMutation.graphql";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ProjectTaskProps } from "../types/ProjectTaskProps";

export const SingleProjectTask = ({ node, projectID }: { node: ProjectTaskProps; projectID: string }) => {
  const { toast } = useToast();
  const [description, setDescription] = useState(node?.description || "");
  const [updateTask] = useMutation<projectUpdateTaskMutation>(UPDATE_TASK);
  const updateTaskInRecord = (store: RecordSourceSelectorProxy<projectUpdateTaskMutation$data>) => {
    const taskInRecord = store.get(node?.id);
    if (taskInRecord && node?.status) {
      taskInRecord.setValue(description, "description");
    }
  };
  if (!node) return null;
  return (
    <Suspense
      fallback={
        <Skeleton className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border min-h-16 w-full pl-3 pr-10 py-3" />
      }
    >
      <div
        className="border border-border first-of-type:rounded-b-none last-of-type:rounded-t-none last-of-type:rounded-b-lg border-b-0 last-of-type:border-b only-of-type:rounded-lg only-of-type:border min-h-16 w-full pl-3 pr-10 py-3"
        key={node.id}
      >
        <div className=" flex items-center justify-between gap-4 font-semibold data-[state=completed]:line-through">
          <TaskStatusButton task={node} />
          <span className={cn("grow", node.status === "COMPLETED" && "line-through")}>{node.title}</span>
          <TaskBadge task={node} />
          <DeleteTaskButton task={node} projectID={projectID} />
        </div>
        <textarea
          className="ml-14 mr-28 mt-2 text-sm border-0 shadow-none rounded-none focus-visible:ring-0 focus:outline-none w-[calc(100%-10rem)] min-h-20 resize-none bg-transparent"
          placeholder="Add a task description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={(e) => {
            const id = node.id;
            updateTask({
              variables: {
                input: {
                  id,
                  description: e.target.value,
                },
              },
              onCompleted: (_, errors) => {
                if (errors) {
                  toast({
                    title: "Error",
                    description: "Task could not be updated. Please try again.",
                    variant: "destructive",
                  });
                }
              },
              updater: (store) => {
                updateTaskInRecord(store);
              },
              optimisticUpdater: (store) => {
                updateTaskInRecord(store);
              },
            });
          }}
        />
      </div>
    </Suspense>
  );
};
