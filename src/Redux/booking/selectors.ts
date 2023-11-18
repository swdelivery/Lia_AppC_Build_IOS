import { AppState } from "@Redux/Reducers/RootReducer";

export const getShowModalAddServiceToBookingState = (state: AppState) => state.booking.datacreatebooking;
export const getBranchListForBookingState = (state: AppState) => state.booking.listbranch;
export const getDoctorListForBookingState = (state: AppState) => state.booking.listdoctor;
export const getPractitionerListForBookingState = (state: AppState) => state.booking.listpractitioner;
export const getDataBranchPickedState = (state: AppState) => state.booking.datacreatebooking;
export const getDataDoctorPickedState = (state: AppState) => state.booking.datacreatebooking;

export const getDataCreateBookingState = (state: AppState) => state.booking.datacreatebooking;
export const getServiceListFilterState = (state: AppState) => state.booking.listservice;

export const getResBookingState = (state: AppState) => state.booking.response;
