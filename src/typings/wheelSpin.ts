import { FileAvatar } from "./common";

export type WheelSpin = {
  description: string;
  isActive: boolean;
  amountPerChange: number;
  isDelete: boolean;
  _id: string;
  name: string;
  code: string;
  details: Reward[];
  imageResponseId: string;
  missions: Mission[];
  userCreate: string;
  created: string;
  updated: string;
  __v: number;
  userUpdate: string;
  imageResponse: FileAvatar;
  id: string;
}

export type Reward = {
  index: number;
  limit: number;
  usage: number;
  _id: string;
  code: string;
  name: string;
  amount: number;
  displayName: string;
  weight: number;
  type: string;
  id: string;
}

export type Mission = {
  _id: string;
  id: string;
  bonusEventCode: string;
}
