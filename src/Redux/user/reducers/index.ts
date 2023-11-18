import { combineReducers } from "redux";
import myVouchers from "./myVouchers";
import myBooking from "./myBooking";

export default combineReducers({
  myVouchers,
  myBooking,
});
