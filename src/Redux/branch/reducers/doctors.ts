import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BRANCH_DOCTORS } from "../types";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  data: Doctor[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: [],
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
  [GET_BRANCH_DOCTORS.REQUEST]: request,
  [GET_BRANCH_DOCTORS.SUCCESS]: success,
  [GET_BRANCH_DOCTORS.FAILURE]: failure,
});
