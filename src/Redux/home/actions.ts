import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICE_GROUP } from "./types";
import { ServiceGroup } from "@typings/serviceGroup";

export const getServiceGroup = generateActionsGroup<any, ServiceGroup[]>(
  GET_SERVICE_GROUP
);
