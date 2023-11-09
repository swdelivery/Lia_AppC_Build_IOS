import { Branch } from "./branch";
import { Timestamp } from "./common";
import { Doctor } from "./doctor";
import { Partner } from "./partner";
import { Service } from "./serviceGroup";

export type ReviewDetail = {
  comment: string;
  rating: number;
  isSelected: boolean;
  _id: string;
};

export type Review = {
  reaction: "VERY_GOOD";
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  treatmentDetailId: string;
  bookingId: string;
  serviceCode: string;
  doctorCode: string;
  branchCode: string;
  doctorId: string;
  saleId: string;
  consultantId: string;
  auditId: string;
  partnerId: string;
  __v: number;
  id: string;
  serviceReview: ReviewDetail;
  receptionReview: ReviewDetail;
  consultantReview: ReviewDetail;
  staffReview: ReviewDetail;
  csReview: ReviewDetail;
  branchReview: ReviewDetail;
  partner: Partner;
  service: Service;
  doctor: Doctor;
  branch: Branch;
} & Timestamp;
