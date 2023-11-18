import { AppState } from "@Redux/Reducers/RootReducer";

export const getInsuranceListState = (state: AppState) => state.insurance.list;
