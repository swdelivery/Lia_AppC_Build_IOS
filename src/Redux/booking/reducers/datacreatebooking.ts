import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CLEAR_COUPON, CLEAR_DATA_CREATE_BOOKING, CLEAR_DOCTOR, CLEAR_PRACTITIONER, OPEN_MODAL_ADD_SERVICE_TO_BOOKING, REMOVE_SERVICE, SELECT_BRANCH, SELECT_COUPON, SELECT_DATE, SELECT_DESCRIPTION, SELECT_DOCTOR, SELECT_INSURANCE, SELECT_PRACTITIONER, SELECT_SERVICE, SELECT_TIME } from "../types";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import moment from "moment";
import { Service } from "@typings/serviceGroup";


export type State = {
  isLoading: boolean;

  dataBranch: Branch;
  dataDoctor: Doctor;
  dataPractitioner: Practitioner;
  dataDate: any;
  dataTime: any;
  dataServices: Service[];
  dataCoupon: any;
  dataInsurance: any;
  dataDescription: string

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
  dataServices: [],
  dataCoupon: null,
  dataInsurance: [],
  dataDescription: '',

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
const selectService: Handler<State> = (state, { payload }) => ({
  ...state,
  dataServices: [
    ...state.dataServices,
    payload
  ],
});
const selectCoupon: Handler<State> = (state, { payload }) => ({
  ...state,
  dataCoupon: payload,
});
const selectInsurance: Handler<State> = (state, { payload }) => {

  let dataTemp = [...state?.dataInsurance]
  let indexFinded = dataTemp?.findIndex(item => item?._id == payload?._id);
  if (indexFinded !== -1) {
    dataTemp.splice(indexFinded, 1)
  } else {
    dataTemp = [payload, ...dataTemp]
  }
  return {
    ...state,
    dataInsurance: dataTemp
  }
}
const selectDescription: Handler<State> = (state, { payload }) => ({
  ...state,
  dataDescription: payload,
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
const clearCoupon: Handler<State> = (state, { payload }) => ({
  ...state,
  dataCoupon: INITIAL_STATE.dataCoupon,
});
const clearDataCreateBooking: Handler<State> = (state, { payload }) => ({
  ...INITIAL_STATE
});

// REMOVE
const removeService: Handler<State> = (state, { payload }) => ({
  ...state,
  dataServices: [
    ...state.dataServices.filter(item => item?.code !== payload?.code),
  ],
});

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_ADD_SERVICE_TO_BOOKING]: openModalAddServiceToBooking,
  [SELECT_BRANCH]: selectBranch,
  [SELECT_DOCTOR]: selectDoctor,
  [SELECT_PRACTITIONER]: selectPractitioner,
  [SELECT_DATE]: selectDate,
  [SELECT_TIME]: selectTime,
  [SELECT_COUPON]: selectCoupon,
  [SELECT_SERVICE]: selectService,
  [SELECT_INSURANCE]: selectInsurance,
  [SELECT_DESCRIPTION]: selectDescription,
  [REMOVE_SERVICE]: removeService,
  [CLEAR_DOCTOR]: clearDoctor,
  [CLEAR_PRACTITIONER]: clearPractitioner,
  [CLEAR_COUPON]: clearCoupon,
  [CLEAR_DATA_CREATE_BOOKING]: clearDataCreateBooking,
});
