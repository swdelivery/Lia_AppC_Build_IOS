import { combineReducers } from "redux";
import list from "./list";
import details from "./details";
import reviews from "./reviews";
import listservicebygr from "./listservicebygr";

export default combineReducers({
  list,
  details,
  reviews,
  listservicebygr
});
