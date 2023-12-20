import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { CommentPost, PartnerDiary, Post } from "@typings/newfeeds";
import { GET_LIST_CAMPAIN } from "./types";
import { Campain } from "@typings/charity";

// // POST
// export const createCommentPost = generateActionsGroup<
//   any,
//   ApiResponse<CommentPost>
// >(CREATE_COMMENT_POST);

// export const createReactionPost = generateActionsGroup<
//   any,
//   ApiResponse<CommentPost>
// >(CREATE_REACTION_POST);

// export const createReactionComment = generateActionsGroup<
//   any,
//   // NOTICE HERE
//   ApiResponse<any>
// >(CREATE_REACTION_COMMENT);

// GET
export const getListCampain = generateActionsGroup<
  any,
  ApiResponse<Campain[]>
>(GET_LIST_CAMPAIN);

// export const getMorePosts = generateActionsGroup<
//   any,
//   ApiResponse<Post[]>
// >(GET_MORE_POSTS);

// export const getPartnerDiary = generateActionsGroup<
//   any,
//   ApiResponse<PartnerDiary>
// >(GET_PARTNER_DIARY);

// export const getCommentsPost = generateActionsGroup<
//   any,
//   ApiResponse<CommentPost>
// >(GET_COMMENTS_POST);

// export const getMoreCommentsPost = generateActionsGroup<
//   any,
//   ApiResponse<CommentPost>
// >(GET_MORE_COMMENTS_POST);

// export const getChildCommentsPost = generateActionsGroup<
//   any,
//   ApiResponse<CommentPost>
// >(GET_CHILD_COMMENTS_POST);

// // SELECT
// export const selectPost = (data) => ({
//   type: SELECT_POST,
//   payload: data,
// });
// export const selectCommentToReply = (data) => ({
//   type: SELECT_COMMENT_TO_REPLY,
//   payload: data,
// });

// // CLEAR
// export const clearCommentsPost = () => ({
//   type: CLEAR_COMMENTS_POST,
// });
