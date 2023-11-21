import { generateActionTypes } from "@Redux/helper";

export const GET_PARTNER_CONVERSATIONS = generateActionTypes(
  "@chat/get-partner-conversations"
);

export const LOAD_MORE_PARTNER_CONVERSATIONS = generateActionTypes(
  "@chat/load-more-partner-conversations"
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
