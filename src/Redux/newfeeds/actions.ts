import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { CommentPost, PartnerDiary, Post } from "@typings/newfeeds";
import {
  CLEAR_COMMENTS_POST,
  CREATE_COMMENT_POST,
  CREATE_REACTION_POST,
  GET_CHILD_COMMENTS_POST,
  GET_COMMENTS_POST,
  GET_LIST_POSTS, GET_MORE_COMMENTS_POST, GET_MORE_POSTS, GET_PARTNER_DIARY, SELECT_COMMENT_TO_REPLY, SELECT_POST
} from "./types";

// POST
export const createCommentPost = generateActionsGroup<
  any,
  ApiResponse<CommentPost>
>(CREATE_COMMENT_POST);

export const createReactionPost = generateActionsGroup<
  any,
  ApiResponse<CommentPost>
>(CREATE_REACTION_POST);

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

export const getCommentsPost = generateActionsGroup<
  any,
  ApiResponse<CommentPost>
>(GET_COMMENTS_POST);

export const getMoreCommentsPost = generateActionsGroup<
  any,
  ApiResponse<CommentPost>
>(GET_MORE_COMMENTS_POST);

export const getChildCommentsPost = generateActionsGroup<
  any,
  ApiResponse<CommentPost>
>(GET_CHILD_COMMENTS_POST);

// SELECT
export const selectPost = (data) => ({
  type: SELECT_POST,
  payload: data,
});
export const selectCommentToReply = (data) => ({
  type: SELECT_COMMENT_TO_REPLY,
  payload: data,
});

// CLEAR
export const clearCommentsPost = () => ({
  type: CLEAR_COMMENTS_POST,
});
