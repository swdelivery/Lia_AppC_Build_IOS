import { AppState } from "@Redux/Reducers/RootReducer";

export const getPartnerRelativeListState = (state: AppState) => state.relatives.list;
