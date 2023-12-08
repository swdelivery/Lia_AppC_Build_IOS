import { combineReducers } from "redux";
import listservice from "./listservice";
import listdoctor from "./listdoctor";
import listbranch from "./listbranch";
import eyeLabel from "./eyeLabel";

export default combineReducers({
  listservice,
  listdoctor,
  listbranch,
  eyeLabel
});
