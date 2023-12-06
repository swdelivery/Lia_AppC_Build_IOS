import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { PartnerDiary } from "@typings/newfeeds";
import { GET_PARTNER_DIARY } from "../types";

export type State = {
  isLoading: boolean;
  data: PartnerDiary;
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: null,
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload?.data?.data
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_PARTNER_DIARY.SUCCESS]: success,
});
