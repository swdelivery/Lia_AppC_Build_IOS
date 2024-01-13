import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ServiceGroup } from "@typings/serviceGroup";
import { RESEND_OTP } from "../types";
import Toast from "react-native-toast-message";

export type State = {
  isLoading: boolean;
  message?: string;
  isSuccess?: boolean;
};

const INITIAL_STATE: State = {
  isLoading: false,
  message: null,
  isSuccess: null
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state, { payload }) => {

  return ({
    ...state,
    isLoading: false,
    isSuccess: false,
    message: payload
  })
};

const success: Handler<State> = (state, { payload }) => {

  return ({
    ...state,
    isLoading: false,
    message: payload.message,
    isSuccess: true
  })
};

const reset: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
  isSuccess: null,
  message: null
})

export default createReducer(INITIAL_STATE, {
  [RESEND_OTP.REQUEST]: request,
  [RESEND_OTP.SUCCESS]: success,
  [RESEND_OTP.FAILURE]: failure,
});
