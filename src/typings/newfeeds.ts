import { Timestamp } from "./common";



export type Post = {
  _id: string;
  content: string;
  images: any;
  documents: any;
  videos: any;
  hiddenIdArr: any;
  hashTagCodeArr: any;
  reaction: any;
  scope: string;
  isActive: boolean;
  isDelete: boolean;
  isSeed: boolean;
  partnerId: string;
  template: any;
  lastInteractAt: string;
  created: string;
  updated: string;
  __v: number;
  reactionStatistics: any;
  reactionCount: number;
  commentsCount: number;
  comments: any;
  partner: any;
  partnersReaction: any;

} & Timestamp;

export type PartnerDiary = {
  postId: string;
  imageBeforeTreatment: any;
  imageAfterTreatment: any;
  hashTagCodeArr: any;
  isSyncingTreatment: boolean;
  isActive: boolean;
  isDelete: boolean;
  isSeed: boolean;
  _id: string;
  partnerId: string;
  serviceName?: string;
  serviceCode: string;
  doctorId: string;
  branchCode: string;
  treatmentDate: string;
  type: string;
  created: string;
  updated: string;
  __v: number;
  dailyDiaryArr: any;
  partner: any;
  id: string;


} & Timestamp;

export type CommentPost = {
  parentId: string;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  content: string;
  postId: string;
  partnerId: string;
  created: string;
  updated: string;
  __v: number;
  commentsCount: number;
  partner: any;
  id: string;
  parentInfo: any;

  // Local
  childComments: any;
} & Timestamp;

export type Meta = {
  page: number
  perPage: number
  totalDocuments: number
  totalPage: number
} 
