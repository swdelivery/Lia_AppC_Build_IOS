import { AppState } from "@Redux/Reducers/RootReducer";

export const getVouchersState = (state: AppState) => state.voucher.list;
