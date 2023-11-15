import { useCallback } from "react";
import { Platform } from "react-native";
import ImageColors from "react-native-image-colors";
import {
  AndroidImageColors,
  IOSImageColors,
} from "react-native-image-colors/lib/typescript/types";
import { useSharedValue } from "react-native-reanimated";
import { isIos } from "src/utils/platform";

export default function useImageColors(options?: {
  defaultPrimayColor?: string;
  defaultSecondColor?: string;
}) {
  const primaryColor = useSharedValue(options?.defaultPrimayColor);
  const secondColor = useSharedValue(options?.defaultSecondColor);

  const getColors = useCallback(async (url: string) => {
    const result = await ImageColors.getColors(url, {
      fallback: "#228B22",
      cache: true,
      key: "",
    });
    if (!result) {
      return;
    }
    if (isIos) {
      primaryColor.value = (result as IOSImageColors).background;
      secondColor.value = (result as IOSImageColors).secondary;
    } else {
      primaryColor.value = (result as AndroidImageColors).dominant;
      secondColor.value = (result as AndroidImageColors).average;
    }
  }, []);

  return {
    primaryColor,
    secondColor,
    getColors,
  };
}
