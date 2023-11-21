import { URL_ORIGINAL } from "@Constant/Url";
import { FileAvatar } from "@typings/common";

export const getImageAvataUrl = (file?: FileAvatar, defaultUrl = "") => {
  return file && file.link ? `${URL_ORIGINAL}/${file?.link}` : defaultUrl;
};
