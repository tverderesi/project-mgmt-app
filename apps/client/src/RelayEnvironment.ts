import { Environment, Network, RecordSource, Store, FetchFunction } from "relay-runtime";

const HTTP_ENDPOINT = import.meta.env.VITE_GRAPHQL_SERVER;
console.log(HTTP_ENDPOINT);
const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  });

  const json = await resp.json();

  return json;
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
