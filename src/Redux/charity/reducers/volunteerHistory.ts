import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ApiMeta } from "@typings/api";
import { Transaction } from "@typings/charity";
import { GET_VOLUNTEER_HISTORY } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Transaction[];
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


export default createReducer(INITIAL_STATE, {
  [GET_VOLUNTEER_HISTORY.REQUEST]: request,
  [GET_VOLUNTEER_HISTORY.SUCCESS]: success,
});
