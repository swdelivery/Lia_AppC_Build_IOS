import { createReducer } from "@Redux/helper";
import * as ActionType from "../Constants/ActionType";
import { UserProfile } from "@typings/user";

type State = {
  infoUser: UserProfile;
};

let initialState: State = {
  infoUser: null,
};

export default createReducer(initialState, {
  [ActionType.CLEAR_INFO_USER]: () => initialState,
  [ActionType.SAVE_INFO_USER]: (state, { payload }) => {
    return {
      ...state,
      infoUser: payload.data,
    };
  },
  [ActionType.EMPLOYEE_UPDATE_AVATAR]: (state, { payload }) => {
    return {
      ...state,
      infoUser: { ...state.infoUser, fileAvatar: payload.data },
    };
  },
});
