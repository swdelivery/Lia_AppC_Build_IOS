/* eslint-disable import/no-extraneous-dependencies */
import AsyncStorage from "@react-native-community/async-storage";
import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split("://")[1].split(":")[0];
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    host: scriptHostname,
    onConnect: () => {
      if (reactotron) {
        // @ts-ignore
        reactotron.clear();
        // Override log and error
        // @ts-ignore
        console.log = reactotron.log;
        // @ts-ignore
        console.error = reactotron.error;
        console.log("Reactotron Configured");
      }
    },
  })
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
