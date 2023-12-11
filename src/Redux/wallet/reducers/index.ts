import { combineReducers } from 'redux';
import infoWallet from "./infoWallet";
import listHistory from "./listHistory";

export default combineReducers({
  infoWallet,
  listHistory
});
