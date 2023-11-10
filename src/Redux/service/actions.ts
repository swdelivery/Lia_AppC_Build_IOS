import { generateActionsGroup } from "@Redux/helper";
import { GET_SERVICES, GET_SERVICE_DETAILS, GET_SERVICE_REVIEWS, GetServiceReviewsParams,GET_SERVICES_BY_GROUPS, SELECT_SERVICE } from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";

export const getServices = generateActionsGroup(GET_SERVICES);

export const getServicesByGroups = generateActionsGroup(GET_SERVICES_BY_GROUPS);

export const getServiceDetails = generateActionsGroup<string, Service>(
  GET_SERVICE_DETAILS
);

export const getServiceReviews = generateActionsGroup<
  GetServiceReviewsParams,
  Review[]
>(GET_SERVICE_REVIEWS);

export const selectService = (service: Service) => ({
  type: SELECT_SERVICE,
  payload: service,
});