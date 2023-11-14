import type { Branch } from "./branch";
import type { FileAvatar, Timestamp } from "./common";
import type { Doctor } from "./doctor";

export type ServiceGroup = {
  parentCode: string;
  childrenCode: string[];
  parentCodeArr: string[];
  officesCode: string;
  orderNumber: string;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  userCreate: string;
  created: string;
  updated: string;
  slug: string;
  __v: number;
  userUpdate: string;
  id: string;
  fileAvatar: FileAvatar;
};

export type ServiceOption = {
  _id: string;
  groupName: string;
  groupCode: string;
  type: string;
  data: {
    description: string;
    content: string;
    _id: string;
    code: string;
    name: string;
    groupCode: string;
    extraAmount: number;
    id: string;
  }[];
};
export type MaterialInfo = {
  _id: string;
  name: string;
  code: string;
  id: string;
};

export type Service = {
  price: number;
  _id: string;
  name: string;
  code: string;
  id: string;
  warranty: number;
  actionTime: number;
  codeGroup: string[];
  totalProgress: number;
  parameterDescription: string;
  advantageDescription: string;
  precedureDescription: string;
  reviewCount: number;
  averageRating: number;
  materialCodeArr: string[];
  materialArr: MaterialInfo[];
  countPartner: number;
  orderNumber: number;
  isDisplayed: boolean;
  isActive: boolean;
  isDelete: boolean;
  description: string;
  representationFileArr: FileAvatar[];
  options: ServiceOption[];
  doctorServices: {
    _id: string;
    id: string;
    serviceCode: string;
    treatmentDoctorCode: string;
    treatmentDoctor: Doctor;
  }[];
  branchServices: {
    _id: string;
    id: string;
    serviceCode: string;
    branchCode: string;
    branch: Branch;
  }[];
} & Timestamp;
