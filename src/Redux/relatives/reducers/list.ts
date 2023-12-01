import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { DELETE_PARTNER_RELATIVE, GET_LIST_PARTNER_RELATIVE } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: any[];
  total: number;
  paging?: PagingInfo;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  total: 0,
};

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  ...payload,
});

const deleteSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = [...state?.data]
  let idRelativeRemoved = payload?.data?.data[0];
  if (idRelativeRemoved) {
    dataTemp = dataTemp.filter(item => item?._id !== idRelativeRemoved)
  }
  return {
    ...state,
    data: dataTemp
  };
};

export default createReducer(INITIAL_STATE, {
  [GET_LIST_PARTNER_RELATIVE.SUCCESS]: success,
  [DELETE_PARTNER_RELATIVE.SUCCESS]: deleteSuccess,
});
