import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { OPEN_MODAL_THANKS } from "../types";

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

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_THANKS]: openModalThanks,
});
