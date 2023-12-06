import { combineReducers } from 'redux';
import listposts from "./listposts";
import infopost from "./infopost";
import partnerdiary from "./partnerdiary";
import listcomments from "./listcomments";

export default combineReducers({
  listposts,
  infopost,
  partnerdiary,
  listcomments
});
