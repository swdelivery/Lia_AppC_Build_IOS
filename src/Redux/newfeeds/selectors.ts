import { AppState } from "../Reducers/RootReducer";

export const getListPostsState = (state: AppState) => state.newfeeds.listPosts;
export const getInfoPostState = (state: AppState) => state.newfeeds.infoPost;
export const getPartnerDiaryState = (state: AppState) => state.newfeeds.partnerDiary;
export const getListCommentsState = (state: AppState) => state.newfeeds.listComments;
