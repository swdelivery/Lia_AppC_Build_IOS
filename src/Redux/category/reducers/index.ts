import { combineReducers } from 'redux';
import dataFilterService from "./dataFilterService";
import resultListService from "./resultListService";

export default combineReducers({
  dataFilterService,
  resultListService
});
