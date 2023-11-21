import { generateActionsGroup } from "@Redux/helper";
import {
  GET_PARTNER_CONVERSATIONS,
  LOAD_MORE_PARTNER_CONVERSATIONS,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { LastMessage } from "@typings/chat";

export const getPartnerConversations = generateActionsGroup<
  any,
  DataPagingPayload<LastMessage[]>
>(GET_PARTNER_CONVERSATIONS);

export const loadMorePartnerConversations = generateActionsGroup<
  any,
  DataPagingPayload<LastMessage[]>
>(LOAD_MORE_PARTNER_CONVERSATIONS);
