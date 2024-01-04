import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { PartnerLevel } from "@typings/affiliate";
import { GET_PARTNER_LEVEL } from "../types";

export type State = {
  data: PartnerLevel[];
};

const INITIAL_STATE: State = {
  data: [],
};

const success: Handler<State> = (state, { payload }) => {
  let sortArray = payload.data.data.sort((a, b) => a.startPoint - b.startPoint);
  return {
    ...state,
    data: sortArray,
  };
};

export default createReducer(INITIAL_STATE, {
  [GET_PARTNER_LEVEL.SUCCESS]: success,
});
