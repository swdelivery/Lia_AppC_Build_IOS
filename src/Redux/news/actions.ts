import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Branch } from "@typings/branch";
import { GET_NEWS } from "./types";
import { News } from "@typings/news";

// GET
export const getNews = generateActionsGroup<
  any,
  ApiResponse<News[]>
>(GET_NEWS);
