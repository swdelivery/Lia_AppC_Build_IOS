import { generateActionsGroup } from "@Redux/helper";
import { OPEN_MODAL_ADD_SERVICE_TO_BOOKING } from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";



export const openModalAddServiceToBooking = (data) => ({
  type: OPEN_MODAL_ADD_SERVICE_TO_BOOKING,
  payload: data,
});