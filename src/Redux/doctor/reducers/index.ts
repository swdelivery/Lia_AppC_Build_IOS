import { combineReducers } from "redux";
import list from "./list";
import details from "./details";
import diaries from "./diaries";
import reviews from "./reviews";

export default combineReducers({
  list,
  details,
  diaries,
  reviews,
});
