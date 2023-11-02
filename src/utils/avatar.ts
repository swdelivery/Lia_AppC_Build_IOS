import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from "@Constant/Url";
import { FileAvatar } from "@typings/common";

export const getImageAvataUrl = (
  file?: FileAvatar,
  defaultUrl = URL_AVATAR_DEFAULT
) => {
  return file ? `${URL_ORIGINAL}/${file?.link}` : defaultUrl;
};
