import Column from "@Components/Column";
import Fade from "@Components/Fade";
import Text from "@Components/Text";
import { BLACK_OPACITY_8, WHITE } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import { useAppState } from "@r0b0t3d/react-native-hooks";
import { last } from "lodash";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Config from "react-native-config";
import useApi from "src/Hooks/services/useApi";
import { useFocused } from "src/Hooks/useNavigation";
import useVisible from "src/Hooks/useVisible";
import VersionService from "src/Services/VersionService";
import { getAppVersion } from "src/utils/version";

const STORE_LINK = Platform.select({
  ios: `itms-apps://itunes.apple.com/vn/app/id6474897526?mt=8`,
  android: `https://play.google.com/store/apps/details?id=com.digitech.lia`,
});

export default function AppUpdateDialog() {
  const dialog = useVersionCheck();

  const handleUpdate = useCallback(() => {
    const link = STORE_LINK as string;
    Linking.canOpenURL(link).then(
      (supported) => {
        if (supported) {
          Linking.openURL(link);
        }
      },
      (err) => console.log(err.message)
    );
    dialog.hide();
  }, []);

  return (
    <Fade visible={dialog.visible} duration={300} style={styles.container}>
      <Column style={styleElement.centerChild} flex={1}>
        <Column
          style={styleElement.centerChild}
          width={300}
          borderRadius={8}
          paddingTop={8 * 4}
          paddingBottom={8 * 2}
          backgroundColor={WHITE}
        >
          <Column gap={8 * 2} paddingHorizontal={8 * 2} alignItems="center">
            <Image
              style={[styles.logoSize]}
              source={require("../../NewImage/log_with_bg.png")}
            />
            <Text size={16} weight="bold">
              Thông báo
            </Text>
            <Text textAlign={"center"}>
              Phiên bản ứng dụng hiện tại không hỗ trợ một số tính năng, vui
              lòng cập nhật phiên bản mới nhất của ứng dụng.
            </Text>
            <TouchableOpacity hitSlop={styleElement.hitslopSm}>
              <Column
                borderRadius={4}
                backgroundColor={"#C8C8C8"}
                paddingVertical={4}
                paddingHorizontal={8 * 4}
                onPress={handleUpdate}
              >
                <Text color={BLACK_OPACITY_8} weight="bold">
                  Đồng ý
                </Text>
              </Column>
            </TouchableOpacity>
          </Column>
        </Column>
      </Column>
    </Fade>
  );
}

export function useVersionCheck() {
  const appUpdateDialog = useVisible();
  const { data, performRequest } = useApi(VersionService.getVersion, []);

  const getData = useCallback(() => {
    performRequest({
      appId: `"${Config.BUNDLE_ID}"`,
      platform: `"${Platform.OS}"`,
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useAppState((state) => {
    if (state === "active") {
      getData();
    }
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const localVersion = getAppVersion();
    if (!localVersion) {
      return;
    }
    if (data.build > localVersion.build) {
      appUpdateDialog.show();
    }
  }, [data]);

  return appUpdateDialog;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,.3)",
    zIndex: 100,
  },
  logoSize: {
    width: 60,
    height: 60,
    borderRadius: 8 * 2,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 8 * 2,
    backgroundColor: WHITE,
  },
});
