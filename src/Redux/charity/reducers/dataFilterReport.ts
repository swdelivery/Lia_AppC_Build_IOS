import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { SELECT_DATE_FORM, SELECT_DATE_TO, SELECT_DEPOSIT, SELECT_ID_VOLUNTEER, SELECT_PAYMENT_METHOD, SELECT_SEARCH_VALUE } from "../types";

export type State = {
  volunteerId: string;
  search: string;
  dateFrom: string;
  dateTo: string;
  paymentMethodCode: any;
  depositAmount: any;
};

const INITIAL_STATE: State = {
  volunteerId: "",
  search: "",
  dateFrom: "",
  dateTo: "",
  paymentMethodCode: [],
  depositAmount: []
};

const selectSearchValue: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    search: payload
  }
}
const selectDateFrom: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dateFrom: payload
  }
}
const selectDateTo: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dateTo: payload
  }
}
const selectPaymentMethod: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    paymentMethodCode: payload
  }
}
const selectDeposit: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    depositAmount: payload
  }
}
const selectIdVolunteer: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    volunteerId: payload
  }
}


export default createReducer(INITIAL_STATE, {
  [SELECT_SEARCH_VALUE]: selectSearchValue,
  [SELECT_DATE_FORM]: selectDateFrom,
  [SELECT_DATE_TO]: selectDateTo,
  [SELECT_PAYMENT_METHOD]: selectPaymentMethod,
  [SELECT_DEPOSIT]: selectDeposit,
  [SELECT_ID_VOLUNTEER]: selectIdVolunteer,
});
