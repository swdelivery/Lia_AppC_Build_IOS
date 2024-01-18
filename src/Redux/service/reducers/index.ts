import { combineReducers } from "redux";
import list from "./list";
import serviceGroup, { State as ServiceGroupState } from "./serviceGroup";
import { PersistConfig, persistReducer } from "redux-persist";
import { reduxStorage } from "@Redux/reduxStorage";

const serviceGroupConfig: PersistConfig<ServiceGroupState> = {
  key: "serviceGroup",
  storage: reduxStorage,
};

export default combineReducers({
  list,
  serviceGroup: persistReducer(serviceGroupConfig, serviceGroup),
});
