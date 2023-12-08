import { FileAvatar, Timestamp } from "./common";
import { Partner } from "./partner";

export type DailyDiary = {
  description: string;
  isSyncingTreatment: boolean;
  isShare: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  partnerId: string;
  date: string;
  partnerDiaryId: string;
  __v: number;
  comments: any;
  commentsCount: number;
  id: string;
  images: FileAvatar[];
} & Timestamp;

export type Diary = {
  id: string;
  postId: string;
  hashTagCodeArr: any[];
  isSyncingTreatment: boolean;
  isActive: boolean;
  isDelete: boolean;
  isSeed: boolean;
  _id: string;
  partnerId: string;
  entityId: string;
  type: string;
  branchCode: string;
  doctorId: string;
  serviceCode: string;
  serviceName: string;
  created: string;
  updated: string;
  __v: number;
  dailyDiaryArr: any[];
  imageBeforeTreatment: FileAvatar[];
  imageAfterTreatment: FileAvatar[];
  partner: Partner;
};
