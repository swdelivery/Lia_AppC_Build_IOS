import { AppState } from "../Reducers/RootReducer";

export const getListExaminationResultsState = (state: AppState) => state.examinationResults.listExaminationResults
export const getDetailExaminationResultState = (state: AppState) => state.examinationResults.detailExaminationResult
