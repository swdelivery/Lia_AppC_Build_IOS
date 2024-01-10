import { measure } from 'react-native-reanimated';
import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { RESEND_OTP, RESET_STATE_VERIFY_OTP_ACCOUNT, VERIFY_OTP_ACCOUNT_PARTER } from "../types";
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
  [VERIFY_OTP_ACCOUNT_PARTER.REQUEST]: request,
  [VERIFY_OTP_ACCOUNT_PARTER.SUCCESS]: success,
  [VERIFY_OTP_ACCOUNT_PARTER.FAILURE]: failure,
  [RESET_STATE_VERIFY_OTP_ACCOUNT.REQUEST]: resetState
});