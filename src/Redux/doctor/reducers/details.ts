import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTOR_DETAILS, SELECT_DOCTOR } from "../types";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  data: Doctor;
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

const selectDoctor: Handler<State> = (state, { payload }) => ({
  ...state,
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [SELECT_DOCTOR]: selectDoctor,
  [GET_DOCTOR_DETAILS.REQUEST]: request,
  [GET_DOCTOR_DETAILS.SUCCESS]: success,
  [GET_DOCTOR_DETAILS.FAILURE]: failure,
});
