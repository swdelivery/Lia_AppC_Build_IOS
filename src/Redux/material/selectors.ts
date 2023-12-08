import { AppState } from "@Redux/Reducers/RootReducer";

export const getMaterialListState = (state: AppState) => state.material.list;
