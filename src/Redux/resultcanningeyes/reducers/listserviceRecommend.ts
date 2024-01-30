import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTORS, GET_SERVICES, GET_SERVICES_RECOMMEND } from "../types";
import { Service } from "@typings/serviceGroup";
import { Doctor } from "@typings/doctor";

export type State = {
  isLoading: boolean;
  recommendServices: Service[];
  extendedServices: Service[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  recommendServices: [],
  extendedServices: [],
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
    recommendServices: payload?.recommendServices,
    extendedServices: payload?.extendedServices,
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_SERVICES_RECOMMEND.REQUEST]: request,
  [GET_SERVICES_RECOMMEND.SUCCESS]: success,
  [GET_SERVICES_RECOMMEND.FAILURE]: failure,
});
