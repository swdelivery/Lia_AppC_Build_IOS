import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CommentPost, Meta } from "@typings/newfeeds";
import { CLEAR_COMMENTS_POST, CREATE_COMMENT_POST, CREATE_REACTION_COMMENT, GET_CHILD_COMMENTS_POST, GET_COMMENTS_POST, GET_MORE_COMMENTS_POST, SELECT_COMMENT_TO_REPLY } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: CommentPost[];
  meta: Meta;
  selectedCommentToReply: CommentPost;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  meta: null,
  selectedCommentToReply: null
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
}

const getMoreCommentsPostSuccess: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: [...state?.data, ...payload?.data?.data],
    meta: payload?.data?.meta
  }
}

const getChildCommentSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = [...state?.data]
  let findIndex = dataTemp.findIndex(item => item?._id == payload?.data?.data[0]?.parentId)
  if (findIndex !== -1) {
    dataTemp[findIndex]['childComments'] = payload?.data?.data
  }
  return {
    ...state,
    data: dataTemp
  }
}
const clearCommentsPost: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    meta: INITIAL_STATE.meta,
    data: INITIAL_STATE.data
  }
}

const createCommentPostSuccess: Handler<State> = (state, { payload }) => {

  if (payload?.data?.data?.parentId) {
    let dataTemp = [...state?.data]
    let findIndex = dataTemp.findIndex(item => item?._id == payload?.data?.data?.parentId)
    if (findIndex !== -1) {
      if (dataTemp[findIndex].hasOwnProperty('childComments')) {
        dataTemp[findIndex]['childComments'].push(payload?.data?.data)
      } else {
        dataTemp[findIndex]['childComments'] = [];
        dataTemp[findIndex]['childComments'].push(payload?.data?.data)
      }
    }
    return {
      ...state,
      data: dataTemp
    }
  } else {
    return {
      ...state,
      data: [payload?.data?.data, ...state.data]
    }
  }
}

const selectCommentToReply: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    selectedCommentToReply: payload
  }
}


const createReactionCommentSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = [...state.data]
  let indexFind = dataTemp?.findIndex(item => item?._id == payload?.commentId);
  if (indexFind !== -1) {
    dataTemp[indexFind]['reactionCount'] = payload?.data?.data?.reactionCount
  } else {
    dataTemp?.map((itemMap, indexMap) => {
      let indexFindCmtChild = itemMap?.childComments?.findIndex(childCmt => childCmt?._id == payload?.commentId);
      if (indexFindCmtChild !== -1) {
        dataTemp[indexMap]['childComments'][indexFindCmtChild]['reactionCount'] = payload?.data?.data?.reactionCount
      }
    })
  }
  return {
    ...state,
    data: dataTemp
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_COMMENTS_POST.REQUEST]: request,
  [GET_COMMENTS_POST.SUCCESS]: success,
  [GET_MORE_COMMENTS_POST.SUCCESS]: getMoreCommentsPostSuccess,
  [GET_CHILD_COMMENTS_POST.SUCCESS]: getChildCommentSuccess,
  [CLEAR_COMMENTS_POST]: clearCommentsPost,
  [CREATE_COMMENT_POST.SUCCESS]: createCommentPostSuccess,
  [SELECT_COMMENT_TO_REPLY]: selectCommentToReply,
  [CREATE_REACTION_COMMENT.SUCCESS]: createReactionCommentSuccess,
});
