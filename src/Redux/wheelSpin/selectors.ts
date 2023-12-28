import { AppState } from "../Reducers/RootReducer";

export const getCurrActiveWheelSpinState = (state: AppState) => state.wheelSpin.currActiveWheelSpin
export const getPartnerWheelTurnState = (state: AppState) => state.wheelSpin.partnerWheelTurn
