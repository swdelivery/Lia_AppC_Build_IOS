import { createReducer } from "@Redux/helper";
import { GET_LIST_SERVICE_FILTER, SELECT_SERVICE_PARENT_CODE_GROUP } from "../types";
import { Handler } from "@Redux/types";
import { Service } from "@typings/serviceGroup";
import { ApiMeta } from "@typings/api";

export type State = {
  data: Service[],
  meta: ApiMeta,
  isLoading: boolean
};

const INITIAL_STATE: State = {
  data: [],
  meta: null,
  isLoading: false
};

const request: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: true
  }
};

const failure: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false
  }
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_LIST_SERVICE_FILTER.REQUEST]: request,
  [GET_LIST_SERVICE_FILTER.FAILURE]: failure,
  [GET_LIST_SERVICE_FILTER.SUCCESS]: success,
});
