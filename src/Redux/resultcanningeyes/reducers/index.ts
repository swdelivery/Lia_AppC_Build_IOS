import { combineReducers } from "redux";
import history, { State } from "./history";
import listservice from "./listservice";
import listdoctor from "./listdoctor";
import listbranch from "./listbranch";
import eyeLabel from "./eyeLabel";
import { reduxStorage } from "@Redux/reduxStorage";
import { PersistConfig, persistReducer } from "redux-persist";

const historyConfig: PersistConfig<State> = {
  key: "historyEyeScan",
  storage: reduxStorage,
};

export default combineReducers({
  history: persistReducer(historyConfig, history),
  listservice,
  listdoctor,
  listbranch,
  eyeLabel,
});
