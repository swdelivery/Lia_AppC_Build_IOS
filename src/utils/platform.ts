import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export const isAndroid = Platform.OS === "android";

export const isIos = Platform.OS === "ios";

export const isTablet = DeviceInfo.isTablet();

export const isAndroid13AndAbove = Number(Platform.Version) >= 33;
