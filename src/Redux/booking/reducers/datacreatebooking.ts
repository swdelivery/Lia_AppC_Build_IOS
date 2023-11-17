import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CLEAR_DOCTOR, CLEAR_PRACTITIONER, OPEN_MODAL_ADD_SERVICE_TO_BOOKING, SELECT_BRANCH, SELECT_DATE, SELECT_DOCTOR, SELECT_PRACTITIONER, SELECT_TIME } from "../types";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import moment from "moment";


export type State = {
  isLoading: boolean;

  dataBranch: Branch;
  dataDoctor: Doctor;
  dataPractitioner: Practitioner;
  dataDate: any;
  dataTime: any;

  isShowModalAddServiceToBooking: {
    flag: false,
    data: {}
  }
};

const INITIAL_STATE: State = {
  isLoading: false,
  dataBranch: null,
  dataDoctor: null,
  dataPractitioner: null,
  dataDate: moment(),
  dataTime: {
    hour: "09",
    minute: "00"
  },

  isShowModalAddServiceToBooking: {
    flag: false,
    data: {}
  }
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  data: payload,
});

const openModalAddServiceToBooking: Handler<State> = (state, { payload }) => ({
  ...state,
  isShowModalAddServiceToBooking: payload,
});

// SELECT
const selectBranch: Handler<State> = (state, { payload }) => ({
  ...state,
  dataBranch: payload,
});
const selectDoctor: Handler<State> = (state, { payload }) => ({
  ...state,
  dataDoctor: payload,
});
const selectPractitioner: Handler<State> = (state, { payload }) => ({
  ...state,
  dataPractitioner: payload,
});
const selectDate: Handler<State> = (state, { payload }) => ({
  ...state,
  dataDate: payload,
});
const selectTime: Handler<State> = (state, { payload }) => ({
  ...state,
  dataTime: payload,
});

// CLEAR
const clearDoctor: Handler<State> = (state, { payload }) => ({
  ...state,
  dataDoctor: INITIAL_STATE.dataDoctor,
});
const clearPractitioner: Handler<State> = (state, { payload }) => ({
  ...state,
  dataPractitioner: INITIAL_STATE.dataPractitioner,
});

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_ADD_SERVICE_TO_BOOKING]: openModalAddServiceToBooking,
  [SELECT_BRANCH]: selectBranch,
  [SELECT_DOCTOR]: selectDoctor,
  [SELECT_PRACTITIONER]: selectPractitioner,
  [SELECT_DATE]: selectDate,
  [SELECT_TIME]: selectTime,
  [CLEAR_DOCTOR]: clearDoctor,
  [CLEAR_PRACTITIONER]: clearPractitioner,
});
