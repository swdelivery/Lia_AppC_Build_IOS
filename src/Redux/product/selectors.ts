import { AppState } from "@Redux/Reducers/RootReducer";

export const getProductsState = (state: AppState) => state.product.list;
