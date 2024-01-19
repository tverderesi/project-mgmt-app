import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { statusDTO } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { Mail, PhoneCall, PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "@/ui/button";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { PROJECT, PROJECT_CLIENT_FRAGMENT, PROJECT_TASKS_FRAGMENT } from "@/graphql/queries/project";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projectProjectQuery } from "@/graphql/queries/__generated__/projectProjectQuery.graphql";
import {
  projectClient_client$data,
  projectClient_client$key,
} from "@/graphql/queries/__generated__/projectClient_client.graphql";
import { projectTasks_tasks$key } from "@/graphql/queries/__generated__/projectTasks_tasks.graphql";
export const Project = () => {
  return (
    <div className="pt-16 flex flex-col gap-4">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProjectDashboard />
      </Suspense>
    </div>
  );
};

const ProjectDashboard = () => {
  const id = useParams<{ id: string }>()?.id;
  const navigate = useNavigate();

  if (!id) {
    navigate("/404");
    return null;
  }

  const { project } = useLazyLoadQuery<projectProjectQuery>(PROJECT, { id });

  const client = project?.client;
  const tasks = project.tasks;
  const description = project.description;

  return (
    <Card className="shadow-none h-96 border-none">
      <CardHeader className="flex flex-row gap-4 items-center flex-wrap">
        <CardTitle className="text-4xl mr-4">{project.name}</CardTitle>
        <Badge>{statusDTO(project?.status)}</Badge>
      </CardHeader>
      <CardContent className="space-y-16">
        <p className="text-3xl font-semibold px-3 -mb-8">Info</p>
        <ClientInfo fragmentRef={client} />

        <DescriptionInfo description={description} />
        {/*@ts-ignore */}
        <Tasks fragmentRef={tasks} />
      </CardContent>
    </Card>
  );
};

function Tasks({ fragmentRef }: { fragmentRef: projectTasks_tasks$key }) {
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

function ClientInfo({ fragmentRef }: { fragmentRef: any }) {
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

const DescriptionInfo = ({ description }: { description: string }) => {
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
