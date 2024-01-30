import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceByResScanningListState = (state: AppState) => state.resultcanningeyes.listservice;
export const getDoctorByResScanningListState = (state: AppState) => state.resultcanningeyes.listdoctor;
export const getBranchByResScanningListState = (state: AppState) => state.resultcanningeyes.listbranch;
export const getEyeLabelState = (state: AppState) => state.resultcanningeyes.eyeLabel;
export const getServicesRecommendByLabelCodesState = (state: AppState) => state.resultcanningeyes.listserviceRecommend;

export const getEyeHistoryState = (state: AppState) =>
  state.resultcanningeyes.history;
