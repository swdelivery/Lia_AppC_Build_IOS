import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_POSTS = generateActionTypes("@newfeeds/get-list-posts");
export const GET_MORE_POSTS = generateActionTypes("@newfeeds/get-more-posts");
export const GET_PARTNER_DIARY = generateActionTypes("@newfeeds/get-partner-diary");

// SELECT
export const SELECT_POST = "@newfeeds/select-post"
