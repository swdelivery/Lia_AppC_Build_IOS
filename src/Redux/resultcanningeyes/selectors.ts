import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceByResScanningListState = (state: AppState) => state.resultcanningeyes.listservice;
export const getDoctorByResScanningListState = (state: AppState) => state.resultcanningeyes.listdoctor;
export const getBranchByResScanningListState = (state: AppState) => state.resultcanningeyes.listbranch;
