import { AppState } from "../Reducers/RootReducer";

export const getDataFilterServiceState = (state: AppState) => state.category.dataFilterService;
export const getResultListServiceState = (state: AppState) => state.category.resultListService;
