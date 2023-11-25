import {combineReducers} from 'redux';
import partnerConversations from './partnerConversations';
import conversation from "./conversation";
import messages from "./messages";

export default combineReducers({
  partnerConversations,
  conversation,
  messages,
});
