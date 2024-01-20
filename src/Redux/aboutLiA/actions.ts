import { generateActionsGroup } from "@Redux/helper";
import { AboutLiA } from "@typings/aboutLiA";
import { ApiResponse } from "@typings/api";
import { GET_ABOUT_LIA } from "./types";

// GET
export const getAboutLiA = generateActionsGroup<
  any,
  ApiResponse<AboutLiA>
>(GET_ABOUT_LIA);
