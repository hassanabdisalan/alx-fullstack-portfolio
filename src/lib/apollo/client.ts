import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { envVariables } from "@/env";

const uploadLink = createUploadLink({
  uri: envVariables.VITE_GQL_URL,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({ url: envVariables.VITE_SOCKET_URL }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
