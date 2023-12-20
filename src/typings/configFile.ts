import { FileAvatar } from "./common";

export enum ConfigFileCode {
  PricePerWheelTurn = "PRICE_PER_WHEEL_TURN",
  ImageVoucherHome = "IMAGE_VOUCHER_HOME",
  ImageFlashSaleHome = "IMAGE_FLASHSALE_HOME",
  FlashSaleRule = "FLASH_SALE_RULE",
  FlashSaleTitle = "IMAGE_FLASHSALE_TITLE",
}

export type ConfigFile = {
  description: string;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  userCreate: string;
  created: string;
  updated: string;
  __v: string;
  id: string;
  fileArr: FileAvatar[];
};
