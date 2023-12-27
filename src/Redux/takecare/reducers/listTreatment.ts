import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ApiMeta } from "@typings/api";
import { PartnerTreatment } from "@typings/takecare";
import { GET_LIST_PARTNER_TREATMENT } from "../types";

export type State = {
  isLoading: boolean;
  data: PartnerTreatment[];
  meta: ApiMeta
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: null,
  meta: null
};


const request: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: true,
  }
}
const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_LIST_PARTNER_TREATMENT.REQUEST]: request,
  [GET_LIST_PARTNER_TREATMENT.SUCCESS]: success,
});
