import { Outlet, useNavigate } from "react-router-dom";
import { gql, useMutation, useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { IS_AUTHENTICATED } from "../IS_AUTHENTICATED";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const LOGOUT = gql`
    mutation Mutation {
      logout
    }
  `;

  const { data, loading, error } = useQuery(IS_AUTHENTICATED);

  useEffect(() => {
    if (error) navigate("../login");
    if (data?.currentUser === null) navigate("../login");

    if (data?.currentUser?.role) navigate(`../app/${data?.currentUser?.role.toLowerCase()}`);
  }, [data, error]);

  useEffect(() => {
    const unsubscribe = client.onResetStore(() => new Promise(() => navigate("../login")));
    return () => {
      unsubscribe();
    };
  }, [client]);

  const [logout] = useMutation(LOGOUT);
  return (
    <div className="h-full w-full">
      <Button
        variant="outline"
        onClick={() => {
          logout();
          client.resetStore();
        }}
      >
        Logout
      </Button>
      {loading && <div>Loading...</div>}
      <Outlet />
    </div>
  );
};
