import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Postoperative } from "@typings/takecare";
import { CLEAR_LIST_POSTOPERATIVE, GET_LIST_POSTOPERATIVE, UPDATE_DAILY_DIARY } from "../types";

export type State = {
  isLoading: boolean;
  data: Postoperative[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: null,
};


const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
  }
}

const updateSuccess: Handler<State> = (state, { payload }) => {
  console.log({ payload });
  let dataTemp = [...state.data]
  let indexFind = dataTemp?.findIndex(item => item?._id == payload?.data?.data?._id);
  if (indexFind !== -1) {
    dataTemp[indexFind] = payload?.data?.data
  }

  return {
    ...state,
    data: dataTemp
  }
}

const clearListPostoperative: Handler<State> = (state, { payload }) => {
  return INITIAL_STATE
}

export default createReducer(INITIAL_STATE, {
  [GET_LIST_POSTOPERATIVE.SUCCESS]: success,
  [UPDATE_DAILY_DIARY.SUCCESS]: updateSuccess,
  [CLEAR_LIST_POSTOPERATIVE]: clearListPostoperative
});
