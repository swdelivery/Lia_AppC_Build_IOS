import React from "react";
import { Provider } from "react-redux";
import AppWrapper from "./src/Navigation/AppWrapper";
import Store from "./src/Redux/store";
import New from "./New";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styleElement } from "@Constant/StyleElement";
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = () => {
  return (
    <>
      <GestureHandlerRootView style={styleElement.flex}>
        <Provider store={Store}>
          <SafeAreaProvider>
            <AppWrapper />
            {/* <New/> */}
          </SafeAreaProvider>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
