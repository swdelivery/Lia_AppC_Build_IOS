import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Wallet } from "@typings/wallet";
import {
  GET_WALLET
} from "./types";

// GET
export const getWallet = generateActionsGroup<
  any,
  ApiResponse<Wallet>
>(GET_WALLET);
