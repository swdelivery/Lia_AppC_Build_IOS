import { _width } from "@Constant/Scale";
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from "@Constant/Url";
import { FileAvatar } from "typings/common";

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getImageAvataUrl = (
  file?: FileAvatar,
  defaultUrl = URL_AVATAR_DEFAULT
) => {
  return file ? `${URL_ORIGINAL}/${file?.link}` : defaultUrl;
};

/**
 * Convert image coords to device coords
 * @param imageCoords image coords
 * @param imageWidth
 * @param extraSpace
 * @param deviceWidth
 * @returns
 */
export const convertImageCoordsToDeviceCoords = (
  imageCoords: number[],
  imageWidth: number,
  deviceWidth = _width
) => {
  const scaleFactor = deviceWidth / imageWidth;
  return imageCoords.map((x) => x * scaleFactor);
};
