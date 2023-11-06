import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewClient } from "./pages/NewClient";
import { NewProject } from "./pages/NewProject";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { SidebarProvider } from "./components/ui/sidebar";
import { MainLayout } from "./MainLayout";

function App() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_SERVER as string,
    cache: cache,
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <SidebarProvider>
                  <ToastProvider>
                    <MainLayout />
                  </ToastProvider>
                </SidebarProvider>
              </ThemeProvider>
            }
          >
            <Route path="clients">
              <Route path="new" element={<NewClient />} />
            </Route>
            <Route path="projects">
              <Route path="new" element={<NewProject />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
