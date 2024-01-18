import { AppRouter } from "./AppRouter";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
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
