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

export const parseUrl = (url: string) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params: any = {};
  let match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

export const hidePartOfString = (
  inputString: string,
  startIndex = 0,
  endIndex = 0
) => {
  const start = Math.max(0, startIndex);
  const end = Math.max(startIndex, Math.min(endIndex, inputString.length));
  var hiddenPart = "*".repeat(end - start);
  var resultString =
    inputString.substring(0, start) + hiddenPart + inputString.substring(end);

  return resultString;
};
