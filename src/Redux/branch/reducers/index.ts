import { Action, AnyAction, Reducer, combineReducers } from "redux";
import list from "./list";
import details from "./details";
import doctors from "./doctors";
import reviews from "./reviews";
import diary from "./diary";
import { resettableReducer } from "@Redux/resettableReducer";
import { SELECT_BRANCH } from "../types";

function resetable<S, A extends Action = AnyAction>(
  originalReducer: Reducer<S, A>
): Reducer<S, A> {
  return resettableReducer(SELECT_BRANCH, originalReducer);
}

export default combineReducers({
  list,
  details,
  doctors: resetable(doctors),
  reviews: resetable(reviews),
  diary: resetable(diary),
});
