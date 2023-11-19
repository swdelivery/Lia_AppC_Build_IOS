import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTOR_LIST_BY_BRANCH_CODE } from "../types";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  data: Doctor[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: [],
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
  data: payload.branchCode === state.data[0]?.branch?.code ? state.data : [],
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  data: payload.data.data,
});

export default createReducer(INITIAL_STATE, {
  [GET_DOCTOR_LIST_BY_BRANCH_CODE.REQUEST]: request,
  [GET_DOCTOR_LIST_BY_BRANCH_CODE.SUCCESS]: success,
  [GET_DOCTOR_LIST_BY_BRANCH_CODE.FAILURE]: failure,
});
