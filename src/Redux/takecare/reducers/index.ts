import { combineReducers } from 'redux';
import listTreatment from "./listTreatment";
import listPostoperative from "./listPostoperative";

export default combineReducers({
  listTreatment,
  listPostoperative
});
