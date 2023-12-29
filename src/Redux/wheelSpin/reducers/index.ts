import { combineReducers } from 'redux';
import currActiveWheelSpin from "./currActiveWheelSpin";
import partnerWheelTurn from "./partnerWheelTurn";

export default combineReducers({
  currActiveWheelSpin,
  partnerWheelTurn
});
