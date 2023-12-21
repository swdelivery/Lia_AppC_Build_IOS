import { AppState } from "../Reducers/RootReducer";

export const getListCampainState = (state: AppState) => state.charity.listCampain;
export const getDetailCampainState = (state: AppState) => state.charity.detailCampain;
export const getListCompanionRequestState = (state: AppState) => state.charity.listCompanionRequest;
export const getDataCreateDonateState = (state: AppState) => state.charity.dataCreateDonateRequest;
