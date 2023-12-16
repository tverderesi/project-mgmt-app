import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";
import { MainLayout } from "./MainLayout";
import { Login } from "./pages/Login";
import { AppLayout } from "./AppLayout";
import { SignUp } from "./pages/SignUp";

function App() {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_SERVER as string,
    cache: cache,
    credentials: "include",
    headers: {
      "client-name": "vite-client",
      "client-version": "1.0.0",
    },
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ToastProvider>
                  <MainLayout />
                </ToastProvider>
              </ThemeProvider>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="app" element={<AppLayout />}>
              <Route path="" element={<div>App</div>} />
              Ro
            </Route>
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
