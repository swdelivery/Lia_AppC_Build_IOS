import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_CURR_ACTIVE_WHEEL_SPIN } from "../types";
import { WheelSpin } from "@typings/wheelSpin";

export type State = {
  data: WheelSpin,
};

const INITIAL_STATE: State = {
  data: {},
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload?.data?.data,
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_CURR_ACTIVE_WHEEL_SPIN.SUCCESS]: success,
});
