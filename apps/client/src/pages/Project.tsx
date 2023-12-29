import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT } from "@/graphql/queries/project";
import { useParams } from "react-router-dom";
import { statusDTO } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { QueryById } from "@/graphql/shared/interfaces";

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
  const id = useParams<{ id: string }>().id;
  const loadedQuery = loadQuery<{
    variables: QueryById;
    response: {
      project: {
        name: string;
        status: string;
        progress: number;
        description: string;
        autoProgress: boolean;
        client: {
          name: string;
          email: string;
          phone: string;
        };
      };
    };
  }>(RelayEnvironment, PROJECT, { id });
  const { project } = usePreloadedQuery(PROJECT, loadedQuery);
  return (
    <Card className="shadow-none h-96 border-none">
      <CardHeader className="flex flex-row gap-4 items-center flex-wrap">
        <CardTitle className="text-4xl mr-4">{project.name}</CardTitle>
        <Badge>{statusDTO(project?.status)}</Badge>
        {project.autoProgress && <Badge> Auto Progress </Badge>}
      </CardHeader>
      <CardContent className="space-y-16">
        <p className="text-3xl font-semibold px-3 -mb-8">Info</p>
        <ClientInfo project={project} />
        <ProgressInfo project={project} />
        <DescriptionInfo project={project} />
        <div className="pb-16">
          <p className="text-3xl font-semibold px-3 -mb-8">Tasks</p>
        </div>
      </CardContent>
    </Card>
  );
};
function ClientInfo({
  project: {
    client: { name, email, phone },
  },
}: {
  project: { client: { name: string; email: string; phone: string } };
}) {
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

export const ProgressInfo = ({ project: { progress } }: { project: { progress: number } }) => (
  <div className="px-3 space-y-4">
    <p className="text-2xl font-semibold">
      Progress <span className="text-lg font-light">{progress}% Completed</span>
    </p>
    <Progress value={progress} />
  </div>
);

const DescriptionInfo = ({ project: { description } }: { project: { description: string } }) => {
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
