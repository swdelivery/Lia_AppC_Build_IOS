import { combineReducers } from "redux";
import flashSale from "./flashSale";
import currentServices from "./currentServices";

export default combineReducers({
  flashSale,
  currentServices,
});
