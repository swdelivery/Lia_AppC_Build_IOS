import { AppState } from "@Redux/Reducers/RootReducer";

export const getDoctorListState = (state: AppState) => state.doctor.list;

export const getDoctorDetailsState = (state: AppState) => state.doctor.details;

export const getDoctorDiariesState = (state: AppState) => state.doctor.diaries;

export const getDoctorReviewsState = (state: AppState) => state.doctor.reviews;
