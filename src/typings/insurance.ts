import { FileAvatar, Timestamp } from "./common";

export type Insurance = {
  price: number;
  timeNumber: number;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: string;
  name: string;
  type: "month" | "year";
  description: string;
  benefit: string;
  insuranceClaim: string;
  rule: string;
  __v: string;
  userUpdate: string;
  id: string;
  avatar: FileAvatar;
} & Timestamp;
