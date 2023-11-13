import * as ActionType from "../Constants/ActionType";

type State = {
  infoUser: any;
};

let initialState: State = {
  infoUser: null,
};

const InfoUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.CLEAR_INFO_USER:
      return {
        ...state,
        infoUser: {},
      };
    case ActionType.SAVE_INFO_USER:
      return {
        ...state,
        infoUser: action.payload.data,
      };
    case ActionType.EMPLOYEE_UPDATE_AVATAR:
      let tempInfouser = { ...state.infoUser };
      tempInfouser.profile["fileAvatar"] = action.payload.data;

      return {
        ...state,
        infoUser: tempInfouser,
      };
    default:
      return state;
  }
};

export default InfoUserReducer;
