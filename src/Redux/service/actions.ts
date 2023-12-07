import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICES, LOAD_MORE_SERVICES } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Service } from "@typings/serviceGroup";

export const getServices = generateActionsGroup<
  void,
  DataPagingPayload<Service[]>
>(GET_SERVICES);

export const loadMoreServices = generateActionsGroup<
  void,
  DataPagingPayload<Service[]>
>(LOAD_MORE_SERVICES);
