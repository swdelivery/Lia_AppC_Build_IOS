import { combineReducers } from 'redux';
import imageVoucher, { State } from "./imageVoucher";

export type ImageVoucherState = {
  imageVoucher: State;
};

export default combineReducers({
  imageVoucher,
});
