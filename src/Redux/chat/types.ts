import { generateActionTypes } from "@Redux/helper";

export const GET_PARTNER_CONVERSATIONS = generateActionTypes(
  "@chat/get-partner-conversations"
);

export const LOAD_MORE_PARTNER_CONVERSATIONS = generateActionTypes(
  "@chat/load-more-partner-conversations"
);

export const GET_CONVERSATION_DETAILS = generateActionTypes(
  "@chat/get-conversation-details"
);

export const GET_CONVERSATION_MESSAGES = generateActionTypes(
  "@chat/get-conversation-messages"
);

export const LOAD_MORE_CONVERSATION_MESSAGES_HISTORY = generateActionTypes(
  "@chat/load-more-conversation-messages"
);

export type GetPartnerConversationsParams = {
  condition: {
    latestMessageTime: {
      from: string;
      to: string;
    };
  };
  search?: string;
};
