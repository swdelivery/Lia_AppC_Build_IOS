import { URL_ORIGINAL } from "@Constant/Url";
import { FileAvatar } from "@typings/common";

export const getImageAvataUrl = (file?: FileAvatar, defaultUrl = "") => {
  const url = file && file.link ? `${URL_ORIGINAL}${file?.link}` : defaultUrl;
  //console.log({ url });

  return url;
  // return "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBP_500kB.webp";
};
