import { FileAvatar } from "./common";

export type News = {
  _id: string;
  codeGroup: string[];
  representationFileIdArr: string[];
  content: string;
  description: string;
  orderNumber: number;
  actions: string[];
  isActive: boolean;
  isPin: boolean;
  isDelete: boolean;
  title: string;
  userCreate: string;
  created: string;
  updated: string;
  slug: string;
  __v: number;
  userUpdate: string;
  representationFileArr: FileAvatar[];
  id: string;
} 
