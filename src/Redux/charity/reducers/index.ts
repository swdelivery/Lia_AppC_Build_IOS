import { combineReducers } from 'redux';
import listCampain from "./listCampain";
import detailCampain from "./detailCampain";
import listCompanionRequest from "./listCompanionRequest";
import dataCreateDonateRequest from "./dataCreateDonateRequest";
import listCampainFilter from "./listCampainFilter";
import volunteerHistory from "./volunteerHistory";

export default combineReducers({
  listCampain,
  detailCampain,
  listCompanionRequest,
  dataCreateDonateRequest,
  listCampainFilter,
  volunteerHistory
});
