import { FileAvatar, FileUpload, Timestamp } from "./common";

export type BranchService = {
  isDelete: false;
  _id: string;
  serviceCode: string;
  branchCode: string;
  userCreate: string;
  __v: number;
  id: string;
  service: {
    price: number;
    warranty: number;
    actionTime: number;
    codeGroup: string[];
    totalProgress: number;
    representationFileIdArr: any[];
    representationFileArr: FileAvatar[];
    parameterDescription: string;
    advantageDescription: string;
    procedureDescription: string;
    reviewCount: number;
    averageRating: number;
    materialCodeArr: any[];
    countPartner: number;
    orderNumber: number;
    isDisplayed: boolean;
    searchFields: string[];
    searchKeys: string[];
    isActive: boolean;
    isDelete: boolean;
    _id: string;
    name: string;
    code: string;
    created: string;
    updated: string;
    slug: string;
    __v: number;
    options: any[];
    id: string;
  };
} & Timestamp;

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
  description: string;
  bannerFileArr: FileAvatar[];
  branchFileArr: FileUpload[];
  branchServices: BranchService[];
  configureArticleArr: string[];
  branchProblemFileArr: FileUpload[];
} & Timestamp;
