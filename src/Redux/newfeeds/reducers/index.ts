import { combineReducers } from 'redux';
import listPosts from "./listPosts";
import infoPost from "./infoPost";
import partnerDiary from "./partnerDiary";
import listComments from "./listComments";

export default combineReducers({
  listPosts,
  infoPost,
  partnerDiary,
  listComments
});
