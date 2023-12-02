import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { AIMessage, Meta } from "@typings/aichat";
import { CREATE_AI_MESSAGE, GET_LIST_AI_MESSAGES, GET_MORE_AI_MESSAGES } from "../types";
import moment from "moment";
import { randomStringFixLengthCode } from "@Constant/Utils";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: AIMessage[];
  meta: Meta
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  meta: null
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
}

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const loadMoreSuccess: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: [...state?.data, ...payload?.data?.data],
    meta: payload?.data?.meta
  }
}

const createMessageRequest: Handler<State> = (state, { payload }) => {
  let messageSendTemp: any = {
    _id: randomStringFixLengthCode(5),
    isTemp: true,
    role: "user",
    created: moment(),
    content: payload?.content,
  };
  let messageRepTemp = {
    _id: randomStringFixLengthCode(5),
    isTemp: true,
    role: 'assistant',
    created: moment(),
    content: `Đang trả lời...`
  }
  return {
    ...state,
    data: [messageRepTemp, messageSendTemp, ...state?.data],
  }
}

const createMessageSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = [...state.data];
  dataTemp = dataTemp.filter(item => !item?.isTemp)
  dataTemp = [...payload.data, ...dataTemp]
  return {
    ...state,
    data: dataTemp
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_LIST_AI_MESSAGES.REQUEST]: request,
  [GET_LIST_AI_MESSAGES.SUCCESS]: success,
  [GET_LIST_AI_MESSAGES.FAILURE]: failure,

  [GET_MORE_AI_MESSAGES.SUCCESS]: loadMoreSuccess,

  [CREATE_AI_MESSAGE.REQUEST]: createMessageRequest,
  [CREATE_AI_MESSAGE.SUCCESS]: createMessageSuccess,
});
