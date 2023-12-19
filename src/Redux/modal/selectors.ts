import { AppState } from "@Redux/Reducers/RootReducer";

export const getStateActionSheetBottom = (state: AppState) => state.modal.actionsheetbottom;
export const getStateActionSheetIcon = (state: AppState) => state.modal.actionsheeticon;
export const getStateModalRightNoti = (state: AppState) => state.modal.modalRightNoti;
export const getStateModalThanks = (state: AppState) => state.modal.modalThanks;


