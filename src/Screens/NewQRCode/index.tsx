import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Screen from "@Components/Screen";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { IconCancelGrey } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import { useNavigate } from "src/Hooks/useNavigation";
import { StatusBar } from "@Components/StatusBar";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import Column from "@Components/Column";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import useConfirmation from "src/Hooks/useConfirmation";
import { Linking } from "react-native";
import { delay } from "src/utils/common";
import { useIsFocused } from "@react-navigation/native";
import usePermission from "src/Hooks/usePermission";
import { useTimeout } from "@r0b0t3d/react-native-hooks";

const maskRowHeight = 100;
const maskColWidth = 500;

const NewQRCode = () => {
  const { showConfirmation } = useConfirmation();
  const { navigation } = useNavigate();
  const device = useCameraDevice("back");
  const [isReady, setIsReady] = React.useState(false);
  const isFocused = useIsFocused();
  const [cameraPermission, requestPermission] = usePermission("camera");

  useTimeout(
    () => {
      setIsReady(true);
    },
    cameraPermission === "granted" ? 1500 : -1
  );

  useEffect(() => {
    _checkPermission();
  }, []);

  const _checkPermission = async () => {
    let result = await requestPermission();
    if (result !== "granted") {
      showConfirmation(
        "Cấp quyền truy cập",
        "Hãy bật quyền truy cập máy ảnh để sử dụng chức năng này nhé?",
        async () => {
          await Linking.openSettings();
        }
      );
    }
  };

  const parseMyJson = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: async (codes) => {
      if (codes?.length > 0) {
        // setScanningSuccess(true);
        let objParsed = parseMyJson(codes[0]?.value);
        console.log({ objParsed });
        if (objParsed?.action == "checkin") {
          // _handleOpenModalListBooking(objParsed);
          navigation.goBack();
          delay(500);
          navigation.navigate(ScreenKey.QR_CODE_BOOKING_LIST, {
            branchCode: objParsed?.branchCode,
          });
        }
      }
    },
  });

  return (
    <Screen safeBottom safeTop>
      <StatusBar barStyle="dark-content" />
      <Row marginVertical={8 * 2} justifyContent="center">
        <Text weight="bold" size={16}>
          QR Code
        </Text>
        <TouchableOpacity onPress={navigation.goBack} style={styles.cancelBtn}>
          <IconCancelGrey style={sizeIcon.md} />
        </TouchableOpacity>
      </Row>
      <Column flex={1}>
        {device && isReady && (
          <Camera
            isActive={isFocused}
            style={styleElement.flex}
            device={device}
            codeScanner={codeScanner}
          />
        )}
        <View style={styles.maskOutter}>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
          />
          <View style={[{ flex: 400 }, styles.maskCenter]}>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            <View style={styles.maskInner} />
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          </View>
          <View
            style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
          />
        </View>
      </Column>
    </Screen>
  );
};

export default NewQRCode;

const styles = StyleSheet.create({
  cancelBtn: {
    position: "absolute",
    right: 8 * 4,
  },
  cameraView: {
    flex: 1,
    justifyContent: "flex-start",
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  maskInner: {
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: { flexDirection: "row" },
});
