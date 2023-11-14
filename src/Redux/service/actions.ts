import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICES } from "./types";

export const getServices = generateActionsGroup(GET_SERVICES);
