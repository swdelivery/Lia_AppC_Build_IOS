import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { PaymentWallet, Wallet } from "@typings/wallet";
import {
  GET_HISTORY_WALLET,
  GET_WALLET
} from "./types";

// GET
export const getWallet = generateActionsGroup<
  any,
  ApiResponse<Wallet>
>(GET_WALLET);
export const getHistoryWallet = generateActionsGroup<
  any,
  ApiResponse<PaymentWallet>
>(GET_HISTORY_WALLET);
