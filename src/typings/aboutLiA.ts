import { FileAvatar } from "./common";

export type AboutLiA = {
  id: string;
  _id: string;
  __v: number;
  name: string;
  logo: FileAvatar;
  description: string;
  slogan: string;
  image: FileAvatar[];
  facebook_link: string;
  website: string;
  android: string;
  ios: string;
  hotline: string;
  email: string;
  address: {
    province: string;
    district: string;
    ward: string;
    street: string;
    fullAddress: string;
  };
  imageFile: FileAvatar[];
  logoFile: FileAvatar
};
