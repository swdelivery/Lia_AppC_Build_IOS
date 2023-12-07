import { FileAvatar, Timestamp } from "./common";

export type Material = {
  materialFileIdArr: number[];
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  description: string;
  specs: string;
  introduction: string;
  tutorial: string;
  price: number;
  userCreate: string;
  __v: number;
  userUpdate: string;
  materialFileArr: FileAvatar[];
  avatar: FileAvatar;
  id: string;
} & Timestamp;
