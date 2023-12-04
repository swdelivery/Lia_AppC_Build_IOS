import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { PartnerDiary, Post } from "@typings/newfeeds";
import {
  GET_LIST_POSTS, GET_MORE_POSTS, GET_PARTNER_DIARY, SELECT_POST
} from "./types";


// GET
export const getListPosts = generateActionsGroup<
  any,
  ApiResponse<Post[]>
>(GET_LIST_POSTS);

export const getMorePosts = generateActionsGroup<
  any,
  ApiResponse<Post[]>
>(GET_MORE_POSTS);

export const getPartnerDiary = generateActionsGroup<
  any,
  ApiResponse<PartnerDiary>
>(GET_PARTNER_DIARY);

// SELECT
export const selectPost = (data) => ({
  type: SELECT_POST,
  payload: data,
});
