import { generateActionTypes } from "@Redux/helper";

export const GET_SERVICES = generateActionTypes("@service/get-services");

export const GET_SERVICES_BY_GROUPS = generateActionTypes("@service/get-services-by-groups");

export const GET_SERVICE_DETAILS = generateActionTypes("@service/get-details");

export const GET_SERVICE_REVIEWS = generateActionTypes("@service/get-reviews");

export const SELECT_SERVICE = "@service/select-service";


export type GetServiceReviewsParams = {
    serviceCode: string;
  };
