import { Outlet } from "react-router-dom";
import { Navbar } from "../features/navigation/Navbar";
import { withErrorBoundary } from "react-error-boundary";
import { AuthErrorFallback } from "../components/error-handling/AuthErrorFallback";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { FullscreenLoader } from "@/components/ui/FullscreenLoader";
export const AppLayout: React.FC = withErrorBoundary(
  withSuspense(() => {
    return (
      <div className="min-h-full w-full p-2 lg:px-4 relative">
        <Navbar />
        <Outlet />
      </div>
    );
  }, <FullscreenLoader />),
  { FallbackComponent: AuthErrorFallback }
);
