import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PROJECT } from "@/graphql/queries";
import { useSuspenseQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { statusDTO } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
export const Project = () => {
  const params = useParams<{ id: string }>();

  return (
    <div className="pt-16 flex flex-col gap-4">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProjectDashboard id={params.id as string} />
      </Suspense>
    </div>
  );
};

const ProjectDashboard = ({ id }: { id: string }) => {
  const { data } = useSuspenseQuery(PROJECT, { variables: { id } });
  return (
    <Card className="shadow-none h-96 border-none">
      <CardHeader className="flex flex-row gap-4 items-center flex-wrap">
        <CardTitle className="text-4xl mr-4">{data?.project?.name}</CardTitle>
        <Badge>{statusDTO(data?.project?.status)}</Badge>
        {data.project.autoProgress ? <Badge> Auto Progress </Badge> : null}
      </CardHeader>
      <CardContent className="space-y-16">
        <p className="text-3xl font-semibold px-3 -mb-8">Info</p>
        <ClientInfo data={data} />
        <ProgressInfo data={data} />
        <DescriptionInfo data={data} />
        <div className="pb-16">
          <p className="text-3xl font-semibold px-3 -mb-8">Tasks</p>
        </div>
      </CardContent>
    </Card>
  );
};
function ClientInfo({ data }: { data: any }) {
  return (
    <div className="px-3 space-y-2">
      <div className="inline-flex items-center gap-2">
        <p className="text-2xl font-semibold">Client</p>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <p className="text-lg inline-flex items-center gap-2 col-span-12">
          <span>
            Name: <span className="font-light">{data?.project?.client?.name}</span>
          </span>
        </p>

        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            E-mail: <span className="font-light">{data?.project?.client?.email}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`mailto:${data?.project?.client?.email}`}>
              <Mail strokeWidth={2} className="h-5 w-5" />
              Email
            </a>
          </Button>
        </div>
        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            Phone: <span className="font-light">{data?.project?.client?.phone}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`tel:${data?.project?.client?.phone}`}>
              <PhoneCall strokeWidth={2} className="h-5 w-5" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ProgressInfo = ({ data }: { data: any }) => (
  <div className="px-3 space-y-4">
    <p className="text-2xl font-semibold">
      Progress <span className="text-lg font-light">{data?.project?.progress}% Completed</span>
    </p>
    <Progress value={data?.project?.progress} />
  </div>
);

const DescriptionInfo = ({ data }: { data: any }) => {
  if (data.project.description)
    return (
      <Accordion type="single" collapsible defaultValue="description">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="text-2xl font-semibold hover:bg-accent hover:text-accent-foreground px-3 rounded hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-justify text-lg font-light p-3">{data?.project?.description}</p>
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
