import { AppState } from "@Redux/Reducers/RootReducer";

export const getPractitionerListState = (state: AppState) => state.practitioner.list;

export const getPractitionerDetailsState = (state: AppState) => state.practitioner.details;

export const getPractitionerDiariesState = (state: AppState) => state.practitioner.diaries;

export const getPractitionerReviewsState = (state: AppState) => state.practitioner.reviews;
