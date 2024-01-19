import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFragment } from "react-relay";
import { PROJECT_CLIENT_FRAGMENT, PROJECT_TASKS_FRAGMENT } from "@/features/project/project";
import { Link } from "react-router-dom";
import { projectTasks_tasks$key } from "@/features/project/__generated__/projectTasks_tasks.graphql";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { ProjectInfo } from "../features/project/ProjectInfo";

export const Project = () => {
  useSetPageTitle("mgmt.app - Project");
  return (
    <div className="pt-16 flex flex-col gap-4">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProjectInfo />
      </Suspense>
    </div>
  );
};

export function Tasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
  const tasks = useFragment(PROJECT_TASKS_FRAGMENT, fragmentRef);

  return (
    <div className="pb-16 space-y-2">
      <p className="text-3xl font-semibold px-3">Tasks</p>
      {tasks.length === 0 && (
        <>
          <p className="text-justify text-lg font-light px-3">
            No tasks provided.{" "}
            <Link to="../tasks/new" className="text-primary underline-offset-4 hover:underline">
              Create a new task now.
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export function ClientInfo({ fragmentRef }: { fragmentRef: any }) {
  const client = useFragment(PROJECT_CLIENT_FRAGMENT, fragmentRef);

  const { name, email, phone } = client;

  return (
    <div className="px-3 space-y-2">
      <div className="inline-flex items-center gap-2">
        <p className="text-2xl font-semibold">Client</p>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <p className="text-lg inline-flex items-center gap-2 col-span-12">
          <span>
            Name: <span className="font-light">{name}</span>
          </span>
        </p>

        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            E-mail: <span className="font-light">{email}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`mailto:${email}`}>
              <Mail strokeWidth={2} className="h-5 w-5" />
              Email
            </a>
          </Button>
        </div>
        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            Phone: <span className="font-light">{phone}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`tel:${phone}`}>
              <PhoneCall strokeWidth={2} className="h-5 w-5" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const DescriptionInfo = ({ description }: { description: string }) => {
  if (description)
    return (
      <Accordion type="single" collapsible defaultValue="description">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="text-2xl font-semibold hover:bg-accent hover:text-accent-foreground px-3 rounded hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-justify text-lg font-light p-3">{description}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return (
    <div className="px-3 space-y-2">
      <p className="text-2xl font-semibold">Description</p>
      <p className="text-justify text-lg font-light">No description provided.</p>
    </div>
  );
};
