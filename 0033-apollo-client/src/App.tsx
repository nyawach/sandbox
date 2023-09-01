import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloError,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLError } from "graphql";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0);
  const e = new ApolloError({
    graphQLErrors: [new GraphQLError("テスト")],
  });
  console.log(e, e instanceof Error, e instanceof ApolloError);

  return (
    <ApolloProvider client={client}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ApolloProvider>
  );
}

export default App;
