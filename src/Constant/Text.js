import { StyleSheet } from "react-native";
import { _widthScale, _heightScale, _moderateScale } from "../Constant/Scale";
import { stylesFont } from "./Font";

export const sizeText = StyleSheet.create({
  small: {
    fontSize: _moderateScale(12),
    ...stylesFont.fontNolan,
    color: "#000",
  },
  small_500: {
    fontSize: _moderateScale(12),
    ...stylesFont.fontNolan500,
    color: "#000",
  },
  small_bold: {
    fontSize: _moderateScale(12),
    ...stylesFont.fontNolanBold,
    color: "#000",
  },
  normal_500: {
    fontSize: _moderateScale(14),
    ...stylesFont.fontNolan500,
    color: "#000",
  },
  normal_bold: {
    fontSize: _moderateScale(14),
    ...stylesFont.fontNolanBold,
    color: "#000",
  },
  large: {
    fontSize: _moderateScale(16),
    ...stylesFont.fontNolan,
    color: "#000",
  },
  large_500: {
    fontSize: _moderateScale(16),
    ...stylesFont.fontNolan500,
    color: "#000",
  },
  large_bold: {
    fontSize: _moderateScale(16),
    ...stylesFont.fontNolanBold,
    color: "#000",
  },
});
