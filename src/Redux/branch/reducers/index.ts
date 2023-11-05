import { combineReducers } from "redux";
import list from "./list";
import details from "./details";
import doctors from "./doctors";
import reviews from "./reviews";
import diary from "./diary";

export default combineReducers({
  list,
  details,
  doctors,
  reviews,
  diary,
});
