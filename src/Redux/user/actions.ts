import { generateActionsGroup } from "@Redux/helper";
import { GET_MY_COUPONS, LOAD_MORE_MY_COUPONS } from "./types";
import { DataPagingPayload } from "@typings/api";
import { MyVoucher } from "@typings/voucher";

export const getMyCoupons = generateActionsGroup<
  void,
  DataPagingPayload<MyVoucher[]>
>(GET_MY_COUPONS);

export const loadMoreMyCoupons = generateActionsGroup<
  void,
  DataPagingPayload<MyVoucher[]>
>(LOAD_MORE_MY_COUPONS);
