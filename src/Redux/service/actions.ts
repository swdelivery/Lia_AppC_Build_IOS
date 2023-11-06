import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICES, GET_SERVICE_DETAILS } from "./types";
import { Service } from "@typings/serviceGroup";

export const getServices = generateActionsGroup(GET_SERVICES);

export const getServiceDetails = generateActionsGroup<string, Service>(
  GET_SERVICE_DETAILS
);
