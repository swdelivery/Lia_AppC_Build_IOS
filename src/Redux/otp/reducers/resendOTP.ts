import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ServiceGroup } from "@typings/serviceGroup";
import { RESEND_OTP } from "../types";
import Toast from "react-native-toast-message";

export type State = {
  isLoading: boolean;
  message?: string;
};

const INITIAL_STATE: State = {
  isLoading: false,
  message: null,
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state,) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => {
  Toast.show({
    text1: payload.message,
    type: "success",
  });
  return ({
    ...state,
    isLoading: false,
    message: payload.message,
  })
};

export default createReducer(INITIAL_STATE, {
  [RESEND_OTP.REQUEST]: request,
  [RESEND_OTP.SUCCESS]: success,
  [RESEND_OTP.FAILURE]: failure,
});