import {
  check,
  PERMISSIONS,
  request,
  PermissionStatus,
} from "react-native-permissions";
import { Platform } from "react-native";

const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const PLATFORM_GALLERY_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const PLATFORM_CAMERA_PERMISSIONS = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  gallery: PLATFORM_GALLERY_PERMISSIONS,
  camera: PLATFORM_CAMERA_PERMISSIONS,
};

const PERMISSION_TYPE = {
  microphone: "microphone",
  gallery: "gallery",
  camera: "camera",
};

export type PermissionType = keyof typeof PERMISSION_TYPE;

class AppPermission {
  checkPermission = async (type: PermissionType): Promise<PermissionStatus> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return "unavailable";
    }
    try {
      const result = await check(permissions);
      return result;
    } catch (error) {
      return "unavailable";
    }
  };

  requestPermission = async (
    type: PermissionType
  ): Promise<PermissionStatus> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return "unavailable";
    }
    try {
      const result = await request(permissions);
      return result;
    } catch (error) {
      return "unavailable";
    }
  };
}

const Permission = new AppPermission();
export {
  Permission,
  PERMISSION_TYPE,
  REQUEST_PERMISSION_TYPE,
  PLATFORM_CAMERA_PERMISSIONS,
  PLATFORM_MICROPHONE_PERMISSIONS,
};
