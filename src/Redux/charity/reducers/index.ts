import { combineReducers } from 'redux';
import listCampain from "./listCampain";
import detailCampain from "./detailCampain";
import listCompanionRequest from "./listCompanionRequest";
import listCompanionRequestAccept from "./listCompanionRequestAccept";
import dataCreateDonateRequest from "./dataCreateDonateRequest";
import listCampainFilter from "./listCampainFilter";
import volunteerHistory from "./volunteerHistory";
import listCompanionByUser from "./listCompanionByUser";
import listTopDonate from "./listTopDonate";
import listPartnerDonateToVolunteerCompanion from "./listPartnerDonateToVolunteerCompanion";
import listPartnerDonateToVolunteer from "./listPartnerDonateToVolunteer";
import dataFilterReport from "./dataFilterReport";
import volunteerHistoryFilter from "./volunteerHistoryFilter";
import volunteerActions from "./volunteerActions";
import detailVolunteerAction from "./detailVolunteerAction";

export default combineReducers({
  listCampain,
  detailCampain,
  listCompanionRequest,
  dataCreateDonateRequest,
  listCampainFilter,
  volunteerHistory,
  listCompanionRequestAccept,
  listCompanionByUser,
  listTopDonate,
  listPartnerDonateToVolunteerCompanion,
  listPartnerDonateToVolunteer,
  dataFilterReport,
  volunteerHistoryFilter,
  volunteerActions,
  detailVolunteerAction
});
