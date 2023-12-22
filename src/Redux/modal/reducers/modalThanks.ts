import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { OPEN_MODAL_THANKS } from "../types";
import { CREATE_VOLUNTEER_COMPANION_DONATE, CREATE_VOLUNTEER_DONATE } from "@Redux/charity/types";

export type State = {
  visible: boolean;
  // NOTICE type any
  data: any;
};

const INITIAL_STATE: State = {
  visible: false,
  data: {
    type: '',
    price: null,
    name: '',
    campainName: '',
    ownerName: ''
  }
};

const openModalThanks: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    visible: payload?.visible,
    data: payload?.data?.type ? payload?.data : INITIAL_STATE.data
  }
};

const createVolunteerDonateSuccess: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    visible: true,
    data: payload?.data
  }
};

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_THANKS]: openModalThanks,
  [CREATE_VOLUNTEER_DONATE.SUCCESS]: createVolunteerDonateSuccess,
  [CREATE_VOLUNTEER_COMPANION_DONATE.SUCCESS]: createVolunteerDonateSuccess
});
