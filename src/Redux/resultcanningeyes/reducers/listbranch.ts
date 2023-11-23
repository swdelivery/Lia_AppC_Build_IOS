import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BRANCHS, GET_DOCTORS } from "../types";
import { Service } from "@typings/serviceGroup";
import { Doctor } from "@typings/doctor";
import { Branch } from "@typings/branch";

export type State = {
  isLoading: boolean;
  dataBranchs: Branch[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  dataBranchs: [],
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
    dataBranchs: payload?.slice(0, 6),
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_BRANCHS.REQUEST]: request,
  [GET_BRANCHS.SUCCESS]: success,
  [GET_BRANCHS.FAILURE]: failure,
});
