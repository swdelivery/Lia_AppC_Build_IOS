import { combineReducers } from "redux";
import actionsheetbottom from "./actionsheetbottom";
import actionsheeticon from "./actionsheeticon";
import modalRightNoti from "./modalRightNoti";
import modalThanks from "./modalThanks";


export default combineReducers({
  actionsheetbottom,
  actionsheeticon,
  modalRightNoti,
  modalThanks
});
