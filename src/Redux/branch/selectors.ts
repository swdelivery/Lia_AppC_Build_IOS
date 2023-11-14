import { AppState } from "@Redux/Reducers/RootReducer";

export const getBranchListState = (state: AppState) => state.branch.list;
