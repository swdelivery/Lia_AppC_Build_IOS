import { combineReducers } from "redux";
import resendOTP from "./resendOTP";
import verifyOTPAccountPartner from "./verifyOTPAccountPartner";
import requestResetPass from "./requestResetPass";
import verifyOTPResetPass from "./verifyOTPResetPass";
import changePass from "./changePass";

export default combineReducers({
  resendOTP,
  verifyOTPAccountPartner,
  requestResetPass,
  verifyOTPResetPass,
  changePass
});
