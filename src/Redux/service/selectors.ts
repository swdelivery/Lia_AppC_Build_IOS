import { AppState } from "@Redux/Reducers/RootReducer";

export const getServiceListState = (state: AppState) => state.service.list;

export const getServiceByGroupsListState = (state: AppState) => state.service.listservicebygr;

export const getServiceDetailsState = (state: AppState) => state.service.details;

export const getServiceReviewsState = (state: AppState) => state.service.reviews;
