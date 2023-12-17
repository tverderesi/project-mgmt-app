import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { CURRENT_USER } from "../graphql/queries";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LOGOUT } from "@/graphql/mutations";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const client = useApolloClient();

  const { data, loading, error } = useQuery(CURRENT_USER);

  useEffect(() => {
    if (error) navigate("../login");
    if (data?.currentUser === null) navigate("../login");

    if (data?.currentUser?.role) {
      const href = `/app/${data?.currentUser?.role.toLowerCase()}`;
      if (!location.pathname.split(href)[1]) navigate(`..${href}`);
      if (location.pathname.split(href)[1]) navigate(location.pathname);
    }
  }, [data, error]);

  useEffect(() => {
    const unsubscribe = client.onResetStore(() => new Promise(() => navigate("../login")));
    return () => {
      unsubscribe();
    };
  }, [client]);

  const [logout] = useMutation(LOGOUT);
  return (
    <div className="h-full w-full p-2 relative">
      <div className="absolute">
        <ModeToggle />
        <Button
          variant="outline"
          onClick={() => {
            logout();
            client.resetStore();
          }}
        >
          Logout
        </Button>
      </div>
      {loading && <div>Loading...</div>}
      <Outlet />
    </div>
  );
};
