import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { Suspense, useEffect } from "react";
import { CURRENT_USER } from "@/graphql/queries/user";
import { Navbar } from "../components/navigation/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironment } from "@/RelayEnvironment";

const queryReference = loadQuery<{
  response: {
    errors: {
      message: string;
    }[];

    currentUser: {
      role: string;
    };
  };
  variables: Record<string, never>;
}>(RelayEnvironment, CURRENT_USER, {});
export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = usePreloadedQuery<{
    variables: Record<string, never>;
    response: {
      currentUser: {
        role: string;
      };
    };
  }>(CURRENT_USER, queryReference);
  // useEffect(() => {
  //   console.log(data, isPending);

  //   if (!isPending && data?.currentUser?.role) {
  //
  //   }
  // }, [data.currentUser, isPending]);

  useEffect(() => {
    console.log(data);
    if (data.currentUser.role) {
      const role = data.currentUser.role;
      const href = `/app/${role.toLowerCase()}`;
      if (location.pathname !== href) navigate(href);
    }
  }, [data]);

  return (
    <div className="h-full w-full p-2 lg:px-4 relative">
      <ErrorBoundary fallback={<FallbackComponent />} onError={logError}>
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-background/80 backdrop-blur flex items-center justify-center w-screen h-screen z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
            </div>
          }
        >
          <Navbar />
        </Suspense>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

function FallbackComponent() {
  return <div>Something went wrong!</div>;
}
const logError = (error: Error) => {
  console.log(error.message);
};
