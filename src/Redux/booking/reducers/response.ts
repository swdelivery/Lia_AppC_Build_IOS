import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CLEAR_RESPONSE, CREAT_PARTNER_BOOKING, GET_BRANCH_LIST_FOR_BOOKING, OPEN_MODAL_ADD_SERVICE_TO_BOOKING } from "../types";
import { Branch } from "@typings/branch";


export type State = {
  loading: boolean,
  data: any,
  error: any,
};

const INITIAL_STATE: State = {
  loading: false,
  data: null,
  error: null,
};

const request: Handler<State> = (state) => ({
  ...state,
  loading: true,
});

const failure: Handler<State> = (state, { payload }) => {
  console.log({ payload });
  return {
    ...state,
    error: payload,
    loading: false,
  }
}

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  loading: false,
  data: payload.data,
});

const clearResponse: Handler<State> = (state) => ({
  ...INITIAL_STATE
});

export default createReducer(INITIAL_STATE, {
  [CREAT_PARTNER_BOOKING.REQUEST]: request,
  [CREAT_PARTNER_BOOKING.SUCCESS]: success,
  [CREAT_PARTNER_BOOKING.FAILURE]: failure,
  [CLEAR_RESPONSE]: clearResponse,
});
