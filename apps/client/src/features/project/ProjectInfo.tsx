import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statusDTO } from "@/lib/utils";
import { useLazyLoadQuery } from "react-relay";
import { PROJECT } from "@/features/project/project";
import { useNavigate, useParams } from "react-router-dom";
import { projectProjectQuery } from "./__generated__/projectProjectQuery.graphql";
import { ClientInfo, DescriptionInfo, Tasks } from "../../pages/Project";

export const ProjectInfo = () => {
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
