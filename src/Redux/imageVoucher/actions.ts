import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { FileAvatar } from "@typings/common";
import { GET_IMAGE_VOUCHER } from "./types";

// SET
export const getImageVoucherHome = generateActionsGroup<
  any,
  ApiResponse<FileAvatar>
>(GET_IMAGE_VOUCHER);
