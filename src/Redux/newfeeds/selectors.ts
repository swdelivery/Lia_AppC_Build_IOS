import { AppState } from "../Reducers/RootReducer";

export const getListPostsState = (state: AppState) => state.newfeeds.listposts;
export const getInfoPostState = (state: AppState) => state.newfeeds.infopost;
export const getPartnerDiaryState = (state: AppState) => state.newfeeds.partnerdiary;
export const getListCommentsState = (state: AppState) => state.newfeeds.listcomments;
