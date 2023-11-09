import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceGroupState = (state: AppState) =>
  state.home.serviceGroup;
