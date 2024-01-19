import { AppRouter } from "./AppRouter";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ThemeProvider } from "@/ui/ThemeProvider";
import { ToastProvider } from "@/ui/toast";
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
