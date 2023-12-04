import { useEffect, useCallback, useState } from "react";
import { useAppState } from "@r0b0t3d/react-native-hooks";
import {
  Permission,
  PermissionType,
} from "src/PermissionConfig/PermissionConfig";
import { PermissionStatus } from "react-native-permissions";

export default function usePermission(
  permission: PermissionType,
  requestImmediately = false
): [
  PermissionStatus,
  (requestIfAvailable?: boolean) => Promise<PermissionStatus>
] {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("unavailable");

  useEffect(() => {
    checkPermission(requestImmediately);
  }, []);

  useAppState((state) => {
    if (state === "active") {
      checkPermission(false);
    }
  });

  const checkPermission = useCallback(
    async (requestIfAvailable = true): Promise<PermissionStatus> => {
      let status = await Permission.checkPermission(permission);
      if (status === "denied" && requestIfAvailable) {
        status = await Permission.requestPermission(permission);
      }
      setPermissionStatus(status);
      return status;
    },
    [permission]
  );

  return [permissionStatus, checkPermission];
}
