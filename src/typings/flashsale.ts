import { Timestamp } from "./common";
import { ConfigFile } from "./configFile";
import { Service } from "./serviceGroup";

type FlashSaleDateRange = {
  from: string;
  to: string;
};

export type FlashSaleTime = {
  hour: number;
  minute: number;
  unixTime: number; //seconds
};

export type FlashSale = {
  dateRange: FlashSaleDateRange;
  timeRange: {
    from: FlashSaleTime;
    to: FlashSaleTime;
  };
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  type: "flashSale";
  __v: number;
  userUpdate: any;
  id: string;

  // local props
  isUpcoming: boolean;
} & Timestamp;

export type FlashSaleService = {
  limit: number;
  usage: number;
  orderNumber: number;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  promotionId: string;
  serviceCode: string;
  discountType: "percent" | "fixed";
  discountAmount: number;
  originalPrice: number;
  finalPrice: number;
  userCreate: string;
  userUpdate: string;
  __v: string;
  service: Service;
} & Timestamp;

export type FlashSalePayload = {
  totalFlashSale: number;
  availableFlashSale: number;
  currentFlashSale: FlashSale;
  nextFlashSale: FlashSale[];
  prevFlashSale: FlashSale[];
  image: ConfigFile;
};
