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

export const MARK_AS_READ = "@chat/mark-as-read";

export const OPEN_TREATMENT_DETAILS = generateActionTypes(
  "@chat/open-treatment-details"
);

export const START_CHAT = generateActionTypes("@chat/start-chat");

export type GetPartnerConversationsParams = {
  condition: {
    latestMessageTime: {
      from: string;
      to: string;
    };
  };
  search?: string;
};

export type StartChatParams = {
  type: "treatment";
  doctorId?: string;
  practitionerId?: string;
};
