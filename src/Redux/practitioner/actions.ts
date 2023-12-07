import { generateActionsGroup } from "@Redux/helper";
import { GET_PRACTITIONER_LIST, LOAD_MORE_PRACTITIONER_LIST } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Practitioner } from "@typings/practitioner";

export const getPractitionerList = generateActionsGroup<
  void,
  DataPagingPayload<Practitioner[]>
>(GET_PRACTITIONER_LIST);

export const loadMorePractitionerList = generateActionsGroup<
  void,
  DataPagingPayload<Practitioner[]>
>(LOAD_MORE_PRACTITIONER_LIST);
