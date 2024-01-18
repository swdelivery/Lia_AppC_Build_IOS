import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICES, GET_SERVICE_GROUP, LOAD_MORE_SERVICES } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Service, ServiceGroup } from "@typings/serviceGroup";

export const getServiceGroup = generateActionsGroup<any, ServiceGroup[]>(
  GET_SERVICE_GROUP
);

export const getServices = generateActionsGroup<
  void,
  DataPagingPayload<Service[]>
>(GET_SERVICES);

export const loadMoreServices = generateActionsGroup<
  void,
  DataPagingPayload<Service[]>
>(LOAD_MORE_SERVICES);
