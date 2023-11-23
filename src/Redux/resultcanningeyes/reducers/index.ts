import { combineReducers } from "redux";
import listservice from "./listservice";
import listdoctor from "./listdoctor";
import listbranch from "./listbranch";

export default combineReducers({
  listservice,
  listdoctor,
  listbranch
});
