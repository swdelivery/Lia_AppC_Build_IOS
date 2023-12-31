import { _height, _width } from "@Constant/Scale";

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
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
  imageHeight: number,
  deviceWidth = _width,
  deviceHeight = _height
) => {
  const imageRatio = imageWidth / imageHeight;
  const deviceRatio = deviceWidth / deviceHeight;
  let finalWidth = deviceWidth;
  let finalHeight = deviceHeight;
  if (imageRatio > deviceRatio) {
    finalWidth = (imageWidth * deviceHeight) / imageHeight;
  } else {
    finalHeight = (imageHeight * deviceWidth) / imageWidth;
  }
  const extraSpaceWidth = (finalWidth - deviceWidth) / 2;
  const extraSpaceHeight = (finalHeight - deviceHeight) / 2;
  return [
    (imageCoords[0] * finalWidth) / imageWidth - extraSpaceWidth,
    (imageCoords[1] * finalHeight) / imageHeight - extraSpaceHeight,
  ];
};
