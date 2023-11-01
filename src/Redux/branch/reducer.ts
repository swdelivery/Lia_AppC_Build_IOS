import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BRANCH_DETAILS } from "./types";
import { Branch } from "typings/branch";

export type State = {
  isLoading: boolean;
  data: Branch;
};

const INITIAL_STATE: State = {
  isLoading: false,
  // @ts-ignore
  data: null,
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [GET_BRANCH_DETAILS.REQUEST]: request,
  [GET_BRANCH_DETAILS.SUCCESS]: success,
  [GET_BRANCH_DETAILS.FAILURE]: failure,
});
