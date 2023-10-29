import React from "react";
import { Provider } from "react-redux";
import AppWrapper from "./src/Navigation/AppWrapper";
import Store from "./src/Redux/Store";

const App = () => {
  return (
    <>
      <Provider store={Store}>
        <AppWrapper />
      </Provider>
    </>
  );
};

export default App;
