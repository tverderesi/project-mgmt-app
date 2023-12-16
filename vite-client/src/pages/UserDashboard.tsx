import { IS_AUTHENTICATED } from "@/IS_AUTHENTICATED";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useLazyQuery, useQuery } from "@apollo/client";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardStackIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { USER } from "./USER";
export const UserDashboard = () => {
  type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    photo: string;
    projects?: {
      name: string;
    }[];
    clients?: {
      name: string;
    }[];
    role: string;
  };
  type CurrentUser = {
    currentUser: User;
  };

  const { data: currentUser } = useQuery(IS_AUTHENTICATED);
  const [user, { data, loading, error }] = useLazyQuery(USER);

  useEffect(() => {
    if (currentUser && !data) {
      const id = (currentUser as CurrentUser).currentUser.id;
      user({ variables: { id } });
    }
  }, [currentUser, data, user]);

  useEffect(() => {}, [data]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && (
        <>
          <Card className="shadow-none ">
            <CardHeader className="p-3">
              <CardTitle>Projects</CardTitle>
              {data.user.projects.length > 0 && <CardDescription> {data.user.projects.length} Projects</CardDescription>}
            </CardHeader>
            <CardContent className="px-3 pb-3">
              {data.user.projects.length === 0 && <p>You don't have any projects yet!</p>}
            </CardContent>
            <CardFooter className="px-3 pb-3 gap-2 flex flex-row justify-end">
              <Button className="font-semibold" variant="outline" asChild>
                <Link to="projects">
                  <span className="flex flex-row items-center">
                    <CardStackIcon className="h-4 w-4 me-2" />
                    <span className="pb-[1px]">View Projects</span>
                  </span>
                </Link>
              </Button>
              <Button
                className="font-semibold  hover:bg-emerald-700 hover:text-secondary-foreground hover:border-emerald-700"
                variant="outline"
                asChild
              >
                <Link to="projects/new">
                  <span className="flex flex-row items-center">
                    <PlusCircle className="h-4 w-4 me-2" />
                    <span className="pb-[1px]">Create Project</span>
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};
