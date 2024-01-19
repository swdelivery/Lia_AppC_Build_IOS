import React from "react";
import { Provider } from "react-redux";
import AppWrapper from "./src/Navigation/AppWrapper";
import Store, { persistor } from "./src/Redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styleElement } from "@Constant/StyleElement";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";


const App = () => {
  return (
    <>
      <GestureHandlerRootView style={styleElement.flex}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <AppWrapper />
              {/* <New/> */}
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
