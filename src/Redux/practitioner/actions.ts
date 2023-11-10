import { generateActionsGroup } from "@Redux/helper";
import {
  GET_PRACTITIONER_DETAILS,
  GET_PRACTITIONER_DIARIES,
  GET_PRACTITIONER_LIST,
  GET_PRACTITIONER_REVIEWS,
  GetPractitionerReviewsParams,
  LOAD_MORE_PRACTITIONER_LIST,
  SELECT_PRACTITIONER,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { Practitioner } from "@typings/practitioner";
import { Review } from "@typings/review";

export const getPractitionerList = generateActionsGroup<
  void,
  DataPagingPayload<Practitioner[]>
>(GET_PRACTITIONER_LIST);

export const loadMorePractitionerList = generateActionsGroup(LOAD_MORE_PRACTITIONER_LIST);

export const getPractitionerDetails = generateActionsGroup<string, Practitioner>(
  GET_PRACTITIONER_DETAILS
);

export const selectPractitioner = (practitioner: Practitioner) => ({
  type: SELECT_PRACTITIONER,
  payload: practitioner,
});

export const getPractitionerDiaries = generateActionsGroup(GET_PRACTITIONER_DIARIES);

export const getPractitionerReviews = generateActionsGroup<
  GetPractitionerReviewsParams,
  Review[]
>(GET_PRACTITIONER_REVIEWS);
