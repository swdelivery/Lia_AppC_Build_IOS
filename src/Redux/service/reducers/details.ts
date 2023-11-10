import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_SERVICE_DETAILS, SELECT_SERVICE } from "../types";
import { Service } from "@typings/serviceGroup";

export type State = {
  isLoading: boolean;
  data: Service;
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


const selectService: Handler<State> = (state, { payload }) => ({
  ...state,
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [GET_SERVICE_DETAILS.REQUEST]: request,
  [GET_SERVICE_DETAILS.SUCCESS]: success,
  [GET_SERVICE_DETAILS.FAILURE]: failure,
  [SELECT_SERVICE]: selectService,
});
