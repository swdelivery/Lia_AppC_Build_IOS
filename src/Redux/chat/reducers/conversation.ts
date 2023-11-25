import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_CONVERSATION_DETAILS } from "../types";

export type State = {
  isLoading: boolean;
  data: any;
};

const INITIAL_STATE: State = {
  isLoading: false,
  // @ts-ignore
  data: null,
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
  data: payload,
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
  [GET_CONVERSATION_DETAILS.REQUEST]: request,
  [GET_CONVERSATION_DETAILS.SUCCESS]: success,
  [GET_CONVERSATION_DETAILS.FAILURE]: failure,
});
