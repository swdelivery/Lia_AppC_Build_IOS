import { AppState } from "../Reducers/RootReducer";

export const getListPartnerTreatmentState = (state: AppState) => state.takecare.listTreatment;
export const getListPostoperativeState = (state: AppState) => state.takecare.listPostoperative;
