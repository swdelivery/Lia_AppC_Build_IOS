import { FileAvatar } from "./common";

export type Partner = {
  _id: string;
  name: string;
  fileAvatar: FileAvatar;
  id: string;
};

export type PartnerPhone = {
  nationCode: string;
  phoneNumber: string;
};
