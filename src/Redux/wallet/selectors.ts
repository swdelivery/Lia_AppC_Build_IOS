import { AppState } from "../Reducers/RootReducer";

export const getWalletState = (state: AppState) => state.wallet.infoWallet;
export const getHistoryWalletState = (state: AppState) => state.wallet.listHistory;
