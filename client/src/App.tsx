import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { AppRouter } from "./AppRouter";

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
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
