import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BOOKING_DETAILS, GET_TREATMENT_SERVICES } from "../types";
import { ServiceTreatment } from "@typings/treatment";

export type State = {
  isLoading: boolean;
  data: ServiceTreatment[];
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
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [GET_TREATMENT_SERVICES.REQUEST]: request,
  [GET_TREATMENT_SERVICES.SUCCESS]: success,
  [GET_TREATMENT_SERVICES.FAILURE]: failure,
});
