import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Campain } from "@typings/charity";
import { GET_DETAIL_CAMPAIN, SELECT_CAMPAIN } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Campain;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: {},
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
  }
}

const selectCampain: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload,
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_DETAIL_CAMPAIN.REQUEST]: request,
  [GET_DETAIL_CAMPAIN.SUCCESS]: success,
  [SELECT_CAMPAIN]: selectCampain,
});
