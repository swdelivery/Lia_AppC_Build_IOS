import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTORS } from "../types";
import { Service } from "@typings/serviceGroup";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  dataDoctors: Doctor[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  dataDoctors: [],
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
    dataDoctors: payload?.data?.slice(0, 6),
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_DOCTORS.REQUEST]: request,
  [GET_DOCTORS.SUCCESS]: success,
  [GET_DOCTORS.FAILURE]: failure,
});
