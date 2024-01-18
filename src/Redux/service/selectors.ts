import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceListState = (state: AppState) => state.service.list;

export const getServiceGroupState = (state: AppState) =>
  state.service.serviceGroup;
