import React from "react";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import { apolloClient, GlobalProvider } from "./components";
import { MainRouter } from "./pages";

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalProvider>
        <MainRouter />
      </GlobalProvider>
    </ApolloProvider>
  );
};
