import { generateActionsGroup } from "@Redux/helper";
import { GET_IMAGE_VOUCHER } from "./types";
import { FileAvatar } from "@typings/common";

// SET
export const getImageVoucherHome = generateActionsGroup<any, FileAvatar>(
  GET_IMAGE_VOUCHER
);
