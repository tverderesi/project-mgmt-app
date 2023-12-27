import { AppRouter } from "./AppRouter";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment";
function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AppRouter />
    </RelayEnvironmentProvider>
  );
}

export default App;
