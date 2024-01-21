import { combineReducers } from 'redux';
import listExaminationResults from "./listExaminationResults";
import detailExaminationResult from "./detailExaminationResult";

export default combineReducers({
  listExaminationResults,
  detailExaminationResult
});
