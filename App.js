import React from "react";
// import DeviceInfo from 'react-native-device-info';
import { Provider } from "react-redux";
import AppWrapper from "./src/Navigation/AppWrapper";
import Store from "./src/Redux/Store";

console.disableYellowBox = true;

const App = () => {
  return (
    <>
      <Provider store={Store}>
        {/* <StatusBar translucent={true} barStyle={'dark-content'}/> */}
        <AppWrapper />
      </Provider>
    </>
  );
};

export default App;
