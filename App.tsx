import React from "react";
import { Provider } from "react-redux";
import AppWrapper from "./src/Navigation/AppWrapper";
import Store from "./src/Redux/store";
import New from "./New";

const App = () => {
  return (
    <>
      <Provider store={Store}>
        <AppWrapper />
        {/* <New/> */}
      </Provider>
    </>
  );
};

export default App;
