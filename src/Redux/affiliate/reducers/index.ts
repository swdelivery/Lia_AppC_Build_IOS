import { combineReducers } from 'redux';
import listPartnerLevel from "./listPartnerLevel";
import currPartnerLevel from "./currPartnerLevel";

export default combineReducers({
  listPartnerLevel,
  currPartnerLevel
});
