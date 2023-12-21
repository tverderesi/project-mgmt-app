import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { CURRENT_USER } from "@/graphql/queries/user";
import { Navbar } from "../components/navigation/Navbar";
import { ErrorBoundary } from "react-error-boundary";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading, error } = useQuery(CURRENT_USER, {
    pollInterval: 60000,
    refetchWritePolicy: "merge",
  });

  useEffect(() => {
    if (error || data?.currentUser) navigate("../login");

    if (data?.currentUser?.role) {
      const href = `/app/${data?.currentUser?.role?.toLowerCase()}`;
      if (location.pathname !== href) navigate(href);
    }
  }, [data, error]);

  return (
    <div className="h-full w-full p-2 lg:px-4 relative">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur flex items-center justify-center w-screen h-screen z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
          </div>
        )}
        <Navbar />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};
