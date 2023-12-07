import { AppState } from "../Reducers/RootReducer";

export const getWalletState = (state: AppState) => state.wallet.infoWallet;
