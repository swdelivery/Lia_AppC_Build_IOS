import { FileAvatar, Timestamp } from "./common";

export type Product = {
  price: number;
  codeGroup: string;
  description: string;
  parameterDescription: string;
  advantageDescription: string;
  procedureDescription: string;
  barCode: string;
  vat: number;
  mainUnit: string;
  materialCodeArr: string[];
  countPartner: number;
  orderNumber: number;
  isDisplayed: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: string;
  name: string;
  userCreate: string;
  slug: string;
  __v: number;
  userUpdate: string;
  id: string;
  representationFileArr: FileAvatar[];
} & Timestamp;
