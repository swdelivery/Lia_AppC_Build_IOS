import { FileAvatar } from "./common";

export type PartnerLevel = {
  status: string;
  promotionCondition: PromotionCondition;
  promotion: Promotion;
  couponCodeArr: string[];
  startPoint: number;
  endPoint: number;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  userUpdate: string;
  updated: string;
  created: string;
  __v: number;
  id: string;
  levelImg: FileAvatar;
}

export type PromotionCondition = {
  description: string;
  revenue: number;
  id: string;
}
export type Promotion = {
  description: string;
  discountRetailService: number;
  discountComboService: number;
  discountFriend: number;
  commissionRate: number;
  indirectCommissionRate: number;
  id: string;
  discountRetailServicePolicy: string;
  discountFriendPolicy: string;
  commissionRatePolicy: string;
  birthDayPolicy: string;
}
