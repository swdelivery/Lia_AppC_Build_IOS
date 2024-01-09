import { FileAvatar, FileUpload, Timestamp } from "./common";
import { Service } from "./serviceGroup";

export type BranchService = {
  isDelete: false;
  _id: string;
  serviceCode: string;
  branchCode: string;
  userCreate: string;
  __v: number;
  id: string;
  service: Service;
};

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
  openTime: string;
  representationFileArr: any[];
  id: string;
  description: string;
  bannerFileArr: FileAvatar[];
  branchFileArr: FileUpload[];
  branchServices: BranchService[];
  configureArticleArr: string[];
  branchProblemFileArr: FileUpload[];
  addressDetails: AddressDetails
} & Timestamp;

export type AddressDetails = {
  nationId: string;
  nation: string;
  cityId: string;
  city: string;
  districtId: string;
  district: string;
  wardId: string;
  ward: string;
  street: string;
  fullAddress: string;
}
