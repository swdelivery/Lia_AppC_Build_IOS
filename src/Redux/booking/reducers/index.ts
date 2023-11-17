import { combineReducers } from "redux";
import datacreatebooking from "./datacreatebooking";
import listbranch from "./listbranch";
import listdoctor from "./listdoctor";
import listpractitioner from "./listpractitioner";


export default combineReducers({
  datacreatebooking,
  listbranch,
  listdoctor,
  listpractitioner
});
