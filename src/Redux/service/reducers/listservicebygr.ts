import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_SERVICES_BY_GROUPS } from "../types";
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
  [GET_SERVICES_BY_GROUPS.REQUEST]: request,
  [GET_SERVICES_BY_GROUPS.SUCCESS]: success,
  [GET_SERVICES_BY_GROUPS.FAILURE]: failure,
});
