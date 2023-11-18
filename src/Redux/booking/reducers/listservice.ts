import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BRANCH_LIST_FOR_BOOKING, GET_LIST_SERVICE_FILTER, OPEN_MODAL_ADD_SERVICE_TO_BOOKING } from "../types";
import { Branch } from "@typings/branch";
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
  data: payload.data,
});


export default createReducer(INITIAL_STATE, {
  [GET_LIST_SERVICE_FILTER.REQUEST]: request,
  [GET_LIST_SERVICE_FILTER.SUCCESS]: success,
  [GET_LIST_SERVICE_FILTER.FAILURE]: failure,
});
