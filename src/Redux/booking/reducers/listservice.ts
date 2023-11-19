import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_LIST_SERVICE_FILTER } from "../types";
import { Service } from "@typings/serviceGroup";

export type State = {
  isLoading: boolean;
  data: Service[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: [],
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
  data: [],
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
  [GET_LIST_SERVICE_FILTER.REQUEST]: request,
  [GET_LIST_SERVICE_FILTER.SUCCESS]: success,
  [GET_LIST_SERVICE_FILTER.FAILURE]: failure,
});
