import { generateActionsGroup } from "@Redux/helper";
import { CHECK_FLASH_SALE, GET_CURRENT_FLASH_SALE_SERVICES } from "./types";
import { FlashSalePayload } from "@typings/flashsale";

export const checkFlashSale = generateActionsGroup<void, FlashSalePayload>(
  CHECK_FLASH_SALE
);

export const getCurrentFlashSaleServices = generateActionsGroup<string>(
  GET_CURRENT_FLASH_SALE_SERVICES
);
