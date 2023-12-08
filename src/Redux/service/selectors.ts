import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceListState = (state: AppState) => state.service.list;

