import { FileAvatar } from "./common";

export type EyeLabel = {
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: string;
  name: string;
  description: string;
  detail: string;
  avatar: FileAvatar;
  userCreate: string;
  created: string;
  updated: string;
  __v: number;
  userUpdate: string;
  id: string;

}

export type Meta = {
  page: number
  perPage: number
  totalDocuments: number
  totalPage: number
} 
