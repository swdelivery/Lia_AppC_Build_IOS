import { AppState } from "@Redux/Reducers/RootReducer";

export const getBranchListState = (state: AppState) => state.branch.list;

export const getBranchDetailsState = (state: AppState) => state.branch.details;

export const getBranchDoctorsState = (state: AppState) => state.branch.doctors;

export const getBranchReviewsState = (state: AppState) => state.branch.reviews;