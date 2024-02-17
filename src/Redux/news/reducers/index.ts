import { combineReducers } from 'redux';
import listNews, { State } from "./listNews";

export type NewsState = {
  listNews: State;
};

export default combineReducers({
  listNews,
});
