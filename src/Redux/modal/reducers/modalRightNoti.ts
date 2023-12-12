import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_PARTNER_NOTIFICATIONS, OPEN_ACTION_SHEET_BOTTOM, OPEN_MODAL_RIGHT_NOTI } from "../types";
import { PartnerNoti } from "@typings/partnerNotification";
import { ApiMeta } from "@typings/api";


export type State = {
  isLoading: boolean;
  visible: boolean;
  meta: ApiMeta;
  data: PartnerNoti[];
};

const INITIAL_STATE: State = {
  visible: false,
  isLoading: false,
  meta: {},
  data: []
};

const openModalRightNoti: Handler<State> = (state, { payload }) => ({
  ...state,
  visible: !state?.visible
});


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

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_RIGHT_NOTI]: openModalRightNoti,
  [GET_PARTNER_NOTIFICATIONS.REQUEST]: request,
  [GET_PARTNER_NOTIFICATIONS.SUCCESS]: success,
});
