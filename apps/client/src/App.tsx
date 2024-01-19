import { AppRouter } from "./AppRouter";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { ErrorBoundary } from "react-error-boundary";
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}

export default App;
