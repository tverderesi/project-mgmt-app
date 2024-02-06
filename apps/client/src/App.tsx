import { AppRouter } from "./AppRouter";
import { RelayEnvironmentProvider, graphql } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { ErrorBoundary } from "react-error-boundary";
import { useLazyLoadQuery } from "react-relay/hooks";
function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
