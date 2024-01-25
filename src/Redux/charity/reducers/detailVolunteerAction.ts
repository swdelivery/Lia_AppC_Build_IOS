import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ApiMeta } from "@typings/api";
import { Transaction, VolunteerActions } from "@typings/charity";
import { GET_DETAIL_VOLUNTEER_ACTION, GET_VOLUNTEER_ACTIONS, GET_VOLUNTEER_HISTORY } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: VolunteerActions;
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
  console.log({ payload });

  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
  }
}


export default createReducer(INITIAL_STATE, {
  [GET_DETAIL_VOLUNTEER_ACTION.REQUEST]: request,
  [GET_DETAIL_VOLUNTEER_ACTION.SUCCESS]: success,
});
