import { combineReducers } from "redux";
import serviceGroup, { State } from "./serviceGroup";
import { PersistConfig } from "redux-persist";
import { reduxStorage } from "@Redux/reduxStorage";
import persistReducer from "redux-persist/es/persistReducer";

const serviceGroupConfig: PersistConfig<State> = {
  key: "serviceGroup",
  storage: reduxStorage,
};

export default combineReducers({
  serviceGroup: persistReducer(serviceGroupConfig, serviceGroup),
});
