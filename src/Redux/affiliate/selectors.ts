import { AppState } from "../Reducers/RootReducer";

export const getListPartnerLevelState = (state: AppState) => state.affiliate.listPartnerLevel
export const getCurrPartnerLevelState = (state: AppState) => state.affiliate.currPartnerLevel
