import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});
