import { FileAvatar } from "./common";
import { Partner } from "./partner";

export type Campain = {
  orderNumber: number;
  fundTarget: number;
  fundCurrent: number;
  // NOTICE
  bannerFileIdArr: any;
  isActive: boolean;
  isHot: boolean;
  favourite: boolean;
  isDelete: boolean;
  _id: string;
  code: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createBy: string;
  avatar: FileAvatar;
  userCreate: string;
  slug: string;
  created: string;
  updated: string;
  __v: number;
  userUpdate: string;
  confidenceScore: number;
  // NOTICE
  bannerFileArr: any;
  currency: any;
  id: string;
}

export type CompanionRequest = {
  targetDeposit: number;
  currentDeposit: number;
  status: string;
  isDelete: boolean;
  _id: string;
  volunteerId: string;
  code: string;
  partnerId: string;
  created: string;
  updated: string;
  __v: number;
  partner: Partner;
  volunteer: Campain;
  id: string;
}
