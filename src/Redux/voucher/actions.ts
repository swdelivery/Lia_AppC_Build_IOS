import { generateActionsGroup } from "@Redux/helper";
import {
  GET_VOUCHERS,
  LOAD_MORE_VOUCHERS,
  TAKE_VOUCHER,
  TakeVoucherParams,
} from "./types";
import { Voucher } from "@typings/voucher";
import { DataPagingPayload } from "@typings/api";

export const getVouchers = generateActionsGroup<
  void,
  DataPagingPayload<Voucher[]>
>(GET_VOUCHERS);

export const loadMoreVouchers = generateActionsGroup<
  void,
  DataPagingPayload<Voucher[]>
>(LOAD_MORE_VOUCHERS);

export const takeVoucher = generateActionsGroup<TakeVoucherParams, void>(
  TAKE_VOUCHER
);
