import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_AI_MESSAGES = generateActionTypes("@aichat/get-list-ai-messages");
export const GET_MORE_AI_MESSAGES = generateActionTypes("@aichat/get-more-ai-messages");

// POST
export const CREATE_AI_MESSAGE = generateActionTypes("@aichat/create-ai-message");

