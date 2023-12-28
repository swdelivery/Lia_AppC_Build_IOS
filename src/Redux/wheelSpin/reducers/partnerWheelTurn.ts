import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_CURR_ACTIVE_WHEEL_SPIN, GET_PARTNER_WHEEL_TURN } from "../types";
import { WheelSpin } from "@typings/wheelSpin";

export type State = {
  data: number,
};

const INITIAL_STATE: State = {
  data: null,
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload?.data?.data?.amount,
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_PARTNER_WHEEL_TURN.SUCCESS]: success,
});
