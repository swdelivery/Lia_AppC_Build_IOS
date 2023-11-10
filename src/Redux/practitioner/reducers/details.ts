import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_PRACTITIONER_DETAILS, SELECT_PRACTITIONER } from "../types";
import { Practitioner } from "@typings/practitioner";

export type State = {
  isLoading: boolean;
  data: Practitioner;
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

const selectPractitioner: Handler<State> = (state, { payload }) => ({
  ...state,
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [SELECT_PRACTITIONER]: selectPractitioner,
  [GET_PRACTITIONER_DETAILS.REQUEST]: request,
  [GET_PRACTITIONER_DETAILS.SUCCESS]: success,
  [GET_PRACTITIONER_DETAILS.FAILURE]: failure,
});
