import React from "react";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import { apolloClient, GlobalProvider } from "./components";
import { DefaultLayout } from "./layouts/default";
import { MainRouter } from "./pages";

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalProvider>
        <DefaultLayout>
          <MainRouter />
        </DefaultLayout>
      </GlobalProvider>
    </ApolloProvider>
  );
};
