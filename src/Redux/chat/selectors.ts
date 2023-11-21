import {AppState} from '../Reducers/RootReducer';

export const getPartnerConversationsState = (state: AppState) =>
  state.chat.partnerConversations;
