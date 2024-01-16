import { AppState } from "@Redux/Reducers/RootReducer";

export const getDoctorListState = (state: AppState) => state.doctor.list;

