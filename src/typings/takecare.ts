import { FileAvatar, Timestamp } from "./common";

export type PartnerTreatment = {
  serviceCodeGroup: any;
  progress: number;
  supporterIdArr: any;
  imageAfterTreatment: FileAvatar;
  imageBeforeTreatment: FileAvatar;
  description: string;
  completeAt: string;
  status: string;
  needCare: boolean;
  treatmentStatusCodeArr: any;
  hashTagCodeArr: any;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  orderServiceId: string;
  treatmentQueueId: string;
  code: string;
  serviceCode: string;
  serviceName: string;
  branchCode: string;
  partnerId: string;
  treatmentDoctorCode: string;
  doctorId: string;
  bookingId: string;
  userCreate: string;
  created: string;
  updated: string;
  __v: number;
  userUpdate: string;
  service: any;
  orderService: any;
  branch: any;
  doctor: any;
  practitioner: any;
  review: any;
  treatmentStatusArr: any;
  id: string;
}

export type Postoperative = {
  serviceCodeGroup: any;
  morning: any;
  noon: any;
  evening: any;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  partnerId: string;
  date: string;
  index: number;
  treatmentDetailId: string;
  treatmentDiaryId: string;
  serviceCode: string;
  serviceName: string;
  created: string;
  images: any;
  updated: string;
  __v: number;
  activityArr: any;
  guidePostoperative: any;
  id: string;
}


export type Meta = {
  page: number
  perPage: number
  totalDocuments: number
  totalPage: number
} 
