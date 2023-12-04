import { combineReducers } from 'redux';
import listposts from "./listposts";
import infopost from "./infopost";
import partnerdiary from "./partnerdiary";

export default combineReducers({
  listposts,
  infopost,
  partnerdiary
});
