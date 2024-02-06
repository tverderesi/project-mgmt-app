import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../features/navigation/Navbar";
import { withErrorBoundary } from "react-error-boundary";
import { AuthErrorFallback } from "../components/error-handling/AuthErrorFallback";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { FullscreenLoader } from "@/components/ui/FullscreenLoader";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "react-relay/hooks";
import { useState, useCallback, useEffect } from "react";
import { AppLayoutQuery } from "./__generated__/AppLayoutQuery.graphql";
import { useInterval } from "usehooks-ts";
export const AppLayout: React.FC = withErrorBoundary(
  withSuspense(() => {
    const [refreshedQueryOptions, setRefreshedQueryOptions] = useState<{
      fetchKey: number;
      fetchPolicy: "network-only";
    }>({
      fetchKey: 0,
      fetchPolicy: "network-only",
    });
    const navigate = useNavigate();
    const { isLoggedIn } = useLazyLoadQuery<AppLayoutQuery>(
      graphql`
        query AppLayoutQuery {
          isLoggedIn
        }
      `,
      {},
      refreshedQueryOptions
    );

    const refresh = useCallback(() => {
      setRefreshedQueryOptions((prev: { fetchKey: number; fetchPolicy: "network-only" }) => ({
        fetchKey: (prev?.fetchKey ?? 0) + 1,
        fetchPolicy: "network-only",
      }));
    }, [setRefreshedQueryOptions]);
    useInterval(() => {
      refresh();
      console.log(refreshedQueryOptions);
      !isLoggedIn && navigate("/login");
    }, 1000 * 60 * 5);

    return (
      <div className="min-h-full w-full p-2 lg:px-4 relative">
        <Navbar />
        <Outlet />
      </div>
    );
  }, <FullscreenLoader />),
  { FallbackComponent: AuthErrorFallback }
);
