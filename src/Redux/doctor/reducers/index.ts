import { combineReducers } from "redux";
import list, { State } from "./list";
import { PersistConfig, persistReducer } from "redux-persist";
import { reduxStorage } from "@Redux/reduxStorage";

const listDoctorConfig: PersistConfig<State> = {
  key: "listDoctor",
  storage: reduxStorage,
};

export default combineReducers({
  list: persistReducer(listDoctorConfig, list),
});
