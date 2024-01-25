import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { MemberFirstMission } from "@typings/memberFirstMission";
import { GET_MEMBER_FIRST_MISSION } from "./types";

// GET
export const getMemberFirstMission = generateActionsGroup<
  any,
  ApiResponse<MemberFirstMission>
>(GET_MEMBER_FIRST_MISSION);
