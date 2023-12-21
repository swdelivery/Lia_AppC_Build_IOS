import { AppState } from "@Redux/Reducers/RootReducer";

export const getFlashSaleState = (state: AppState) => state.flashSale.flashSale;

export const getCurrentFlashSaleServicesState = (state: AppState) =>
  state.flashSale.currentServices;
