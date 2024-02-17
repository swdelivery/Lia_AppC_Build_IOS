import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { FileAvatar } from "@typings/common";
import { GET_IMAGE_VOUCHER } from "../types";

export type State = {
  data: FileAvatar,
  isFirstLoaded: boolean
};

const INITIAL_STATE: State = {
  data: null,
  isFirstLoaded: false,
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload,
    isFirstLoaded: true,
  };
};

const failure: Handler<State> = (state, { payload }) => ({
  ...state,
  isFirstLoaded: true,
});

export default createReducer(INITIAL_STATE, {
  [GET_IMAGE_VOUCHER.SUCCESS]: success,
  [GET_IMAGE_VOUCHER.FAILURE]: failure,
});
