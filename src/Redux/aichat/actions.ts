import { generateActionsGroup } from "@Redux/helper";
import {
  CREATE_AI_MESSAGE,
  GET_LIST_AI_MESSAGES, GET_MORE_AI_MESSAGES
} from "./types";
import { ApiResponse } from "@typings/api";
import { AIMessage } from "@typings/aichat";

// GET
export const getListAIMessages = generateActionsGroup<
  string,
  ApiResponse<AIMessage[]>
>(GET_LIST_AI_MESSAGES);
export const getMoreAIMessages = generateActionsGroup<
  string,
  ApiResponse<AIMessage[]>
>(GET_MORE_AI_MESSAGES);

// POST
export const createAIMessage = generateActionsGroup<
  string,
  { data: AIMessage[] }
>(CREATE_AI_MESSAGE);
