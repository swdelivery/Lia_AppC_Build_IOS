import { FileAvatar, Timestamp } from "./common";

export type Branch = {
  isActive: boolean;
  reviewCount: number;
  averageRating: number;
  representationFileIdArr: any[];
  countPartner: number;
  orderNumber: number;
  isDisplayed: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  avatar: FileAvatar;
  code: string;
  phone: string;
  userCreate: string;
  slug: string;
  __v: number;
  userUpdate: string;
  address: string;
  representationFileArr: any[];
  id: string;
} & Timestamp;
