import { AppState } from "@Redux/Reducers/RootReducer";

export const getMyCouponsState = (state: AppState) => state.user.myVouchers;
