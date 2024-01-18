import { generateActionTypes } from "@Redux/helper";

export const GET_SERVICE_GROUP = generateActionTypes(
  "@service/get-service-group"
);

export const GET_SERVICES = generateActionTypes("@service/get-services");

export const LOAD_MORE_SERVICES = generateActionTypes(
  "@service/load-more-services"
);
