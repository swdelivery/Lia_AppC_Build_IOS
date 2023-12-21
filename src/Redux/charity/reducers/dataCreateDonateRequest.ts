import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { SELECT_AMOUNT, SELECT_DESCRIPTION, SELECT_HIDE_NAME, SELECT_IMAGE, SELECT_PAYMENT_METHOD_CODE, SELECT_VOLUNTEER_ID } from "../types";

export type State = {
  volunteerId: string;
  amount: number;
  paymentMethodCode: string;
  isHideName: boolean;
  currencyCode: string;
  description: string;
  images: any;
};

const INITIAL_STATE: State = {
  volunteerId: null,
  amount: null,
  paymentMethodCode: "BANK_TRANSFER",
  isHideName: false,
  currencyCode: "VND",
  description: "",
  images: [],
};

const selectVolunteerId: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    volunteerId: payload
  }
}
const selectPaymentMethodCode: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    paymentMethodCode: payload
  }
}
const selectAmount: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    amount: payload
  }
}
const selectHideName: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isHideName: payload
  }
}
const selectDescription: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    description: payload
  }
}
const selectImage: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    images: payload
  }
}


export default createReducer(INITIAL_STATE, {
  [SELECT_VOLUNTEER_ID]: selectVolunteerId,
  [SELECT_PAYMENT_METHOD_CODE]: selectPaymentMethodCode,
  [SELECT_AMOUNT]: selectAmount,
  [SELECT_HIDE_NAME]: selectHideName,
  [SELECT_DESCRIPTION]: selectDescription,
  [SELECT_IMAGE]: selectImage,
});
