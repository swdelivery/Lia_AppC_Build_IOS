import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ApiMeta } from "@typings/api";
import { CompanionRequest } from "@typings/charity";
import { CREATE_VOLUNTEER_COMPANION, GET_LIST_COMPANION_REQUEST } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: CompanionRequest[];
  meta: ApiMeta
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  meta: null
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
}

const createSuccess: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: [payload?.data?.data, ...state.data],
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_LIST_COMPANION_REQUEST.REQUEST]: request,
  [GET_LIST_COMPANION_REQUEST.SUCCESS]: success,
  [CREATE_VOLUNTEER_COMPANION.SUCCESS]: createSuccess,
});
