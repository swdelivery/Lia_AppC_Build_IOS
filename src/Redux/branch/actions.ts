import { generateActionsGroup } from "@Redux/helper";
import { GET_BRANCH_DETAILS } from "./types";

export const getBranchDetails = generateActionsGroup(GET_BRANCH_DETAILS);
