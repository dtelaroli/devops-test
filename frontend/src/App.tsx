import React from "react";
import "./App.css";
import { DefaultLayout } from "./layouts/default";
import { MainRouter } from "./pages";

export const App = () => {
  return (
    <DefaultLayout>
      <MainRouter />
    </DefaultLayout>
  );
};

export default App;
