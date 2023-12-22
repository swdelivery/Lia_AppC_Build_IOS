import { AppState } from "../Reducers/RootReducer";

export const getListCampainState = (state: AppState) => state.charity.listCampain;
export const getListCampainFilterState = (state: AppState) => state.charity.listCampainFilter;
export const getDetailCampainState = (state: AppState) => state.charity.detailCampain;
export const getListCompanionRequestState = (state: AppState) => state.charity.listCompanionRequest;
export const getListCompanionRequestAcceptState = (state: AppState) => state.charity.listCompanionRequestAccept;
export const getListCompanionByUserState = (state: AppState) => state.charity.listCompanionByUser;
export const getDataCreateDonateState = (state: AppState) => state.charity.dataCreateDonateRequest;
export const getVolunteerHistoryState = (state: AppState) => state.charity.volunteerHistory;
