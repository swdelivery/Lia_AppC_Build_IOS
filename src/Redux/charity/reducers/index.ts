import { combineReducers } from 'redux';
import listCampain from "./listCampain";
import detailCampain from "./detailCampain";
import listCompanionRequest from "./listCompanionRequest";

export default combineReducers({
  listCampain,
  detailCampain,
  listCompanionRequest
});
