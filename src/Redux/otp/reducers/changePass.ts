import { measure } from 'react-native-reanimated';
import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CHANGE_PASS, RESEND_OTP, RESET_STATE_CHANGE_PASS, RESET_STATE_VERIFY_OTP_ACCOUNT, RESET_STATE_VERIFY_OTP_RESET_PASS, VERIFY_OTP_ACCOUNT_PARTER, VERIFY_OTP_RESET_PASS } from "../types";
import Toast from 'react-native-toast-message';

export type State = {
  isLoading: boolean;
  isSuccess?: boolean;
  message?: string;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isSuccess: null,
  message: null
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state, { payload }) => {
  Toast.show({
    text1: payload,
    type: "error",
  });
  return {
    isLoading: false,
    isSuccess: false,
    message: payload
  }
}

const success: Handler<State> = (state, { payload }) => {
  Toast.show({
    text1: payload.message,
    type: "success",
  });
  return {
    ...state,
    isLoading: false,
    isSuccess: true,
    message: payload.measure
  }
}

const resetState: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
  isSuccess: null,
  message: null
});

export default createReducer(INITIAL_STATE, {
  [CHANGE_PASS.REQUEST]: request,
  [CHANGE_PASS.SUCCESS]: success,
  [CHANGE_PASS.FAILURE]: failure,
  [RESET_STATE_CHANGE_PASS.REQUEST]: resetState
});