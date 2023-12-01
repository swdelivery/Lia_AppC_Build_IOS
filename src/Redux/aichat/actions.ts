import { generateActionsGroup } from "@Redux/helper";
import {
  CREATE_AI_MESSAGE,
  GET_LIST_AI_MESSAGES, GET_MORE_AI_MESSAGES
} from "./types";

// GET
export const getListAIMessages = generateActionsGroup(GET_LIST_AI_MESSAGES);
export const getMoreAIMessages = generateActionsGroup(GET_MORE_AI_MESSAGES);

// POST
export const createAIMessage = generateActionsGroup(CREATE_AI_MESSAGE);
