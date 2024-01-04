import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { PartnerLevel } from "@typings/affiliate";
import { SET_CURR_PARTNER_LEVEL } from "../types";

export type State = {
  data: PartnerLevel,
};

const INITIAL_STATE: State = {
  data: {},
};

const setCurrPartnerLevel: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload,
  }
};

export default createReducer(INITIAL_STATE, {
  [SET_CURR_PARTNER_LEVEL]: setCurrPartnerLevel,
});
