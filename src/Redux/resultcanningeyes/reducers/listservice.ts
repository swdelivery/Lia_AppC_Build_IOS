import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTORS, GET_SERVICES } from "../types";
import { Service } from "@typings/serviceGroup";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  dataServices: Service[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  dataServices: [],
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    dataServices: payload.slice(0, 6),
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_SERVICES.REQUEST]: request,
  [GET_SERVICES.SUCCESS]: success,
  [GET_SERVICES.FAILURE]: failure,
});
