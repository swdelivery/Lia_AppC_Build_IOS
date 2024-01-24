import { AddressDetails } from "./branch";
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
  address: any;
  to: string;
  story: string;
  representationFileArr: FileAvatar[]
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

export type Transaction = {
  depositAmount: number;
  message: string;
  isDelete: boolean;
  _id: string;
  volunteerId: string;
  userCreate: string;
  paymentMethodCode: string;
  status: string;
  created: string;
  updated: string;
  __v: number;
  creater: any;
  partner: Partner;
  volunteer: Campain;
  volunteerCompanion: any;
  id: string;
}

export type Donate = {
  partnerId: string;
  partner: Partner;
  totalAmount: number;
}

export type VolunteerActions = {
  address: AddressDetails;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  startDate: string;
  volunteerId: string;
  orderNumber: number;
  members: number;
  avatar: FileAvatar;
  code: string;
  userCreate: string;
  created: string;
  updated: string;
  __v: number;
  volunteer: Campain;
  locationInfo: string;
}
