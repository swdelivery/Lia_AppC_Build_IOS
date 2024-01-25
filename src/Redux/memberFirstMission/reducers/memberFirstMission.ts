import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { MemberFirstMission } from "@typings/memberFirstMission";
import { GET_MEMBER_FIRST_MISSION } from "../types";

export type State = {
  data: MemberFirstMission,
};

const INITIAL_STATE: State = {
  data: {
    register: "FINISHED",
    collaborators: "WAIT",
    firstWalletCharge: "UNFINISHED",
    missionStatus: "UNFINISHED"
  },
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload.data.data,
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_MEMBER_FIRST_MISSION.SUCCESS]: success,
});
