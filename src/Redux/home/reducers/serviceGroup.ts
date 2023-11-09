import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_SERVICE_GROUP } from "../types";
import { ServiceGroup } from "@typings/serviceGroup";

export type State = {
  isLoading: boolean;
  data: ServiceGroup[];
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
  [GET_SERVICE_GROUP.REQUEST]: request,
  [GET_SERVICE_GROUP.SUCCESS]: success,
  [GET_SERVICE_GROUP.FAILURE]: failure,
});
