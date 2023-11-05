import { FileAvatar } from "./common";

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

export type Service = {
  price: number;
  _id: string;
  name: string;
  code: string;
  id: string;
};