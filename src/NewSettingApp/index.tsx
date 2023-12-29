import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "@Components/Screen";
import Column from "@Components/Column";
import Text from "@Components/Text";
import CardSetting from "./Components/CardSetting";
import { checkNotifications } from "react-native-permissions";
import { openSettings, RESULTS } from "react-native-permissions";
import Row from "@Components/Row";
import { IconRightArrowBase } from "@Components/Icon/Icon";
import { BASE_COLOR, BORDER_COLOR, WHITE } from "@Constant/Color";
import useConfirmation from "src/Hooks/useConfirmation";
import { removeAccount } from "@Redux/Action/ProfileAction";
import { useNavigate } from "src/Hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import LiAHeader from "@Components/Header/LiAHeader";
import { logOut } from "@Redux/user/actions";
import { getInfoUserReducer } from "@Redux/Selectors";
import usePermission from "src/Hooks/usePermission";

const NewSettingApp = () => {
  const dipsatch = useDispatch();
  const { infoUser } = useSelector(getInfoUserReducer);

  const [microPermission, checkMicrophonePermission] =
    usePermission("microphone");
  const [galleryPermission, checkGalleryPermission] = usePermission("gallery");
  const [cameraPermission, checkCameraPermission] = usePermission("camera");
  const [perNotifi, setPerNotifi] = useState(null);

  const { showConfirmation } = useConfirmation();

  const { navigate } = useNavigate();

  useEffect(() => {
    checkNotifications().then(({ status, settings }) => {
      console.log({ status, settings });
      setPerNotifi(status);
    });
  }, []);

  const _handleOnCamera = useCallback(
    async (value: boolean) => {
      if (!value || cameraPermission === RESULTS.BLOCKED) {
        return openSettings();
      }
      checkCameraPermission();
    },
    [cameraPermission, checkCameraPermission]
  );

  const _handleOnGallery = useCallback(
    async (value: boolean) => {
      if (!value || galleryPermission === RESULTS.BLOCKED) {
        return openSettings();
      }
      checkGalleryPermission();
    },
    [galleryPermission, checkGalleryPermission]
  );

  const _handleOnMicro = useCallback(
    async (value: boolean) => {
      if (!value || microPermission === RESULTS.BLOCKED) {
        return openSettings();
      }
      checkMicrophonePermission();
    },
    [microPermission, checkMicrophonePermission]
  );

  const handleNotifcationUpdate = useCallback((value: boolean) => {
    openSettings();
  }, []);

  const _handleDeleteAccount = () => {
    showConfirmation(
      "Bạn có chắn chắn muốn xoá tài khoản?",
      "Tài khoản của bạn sẽ bị xoá vĩnh viễn. \n Thông tin đơn hàng và các thông tin khác cũng sẽ bị xoá.",
      async () => {
        let result = await removeAccount(infoUser?._id);
        if (result?.isAxiosError) return;
        _handleLogOut();
      }
    );
  };

  const _handleLogOut = useCallback(() => {
    dipsatch(logOut());
  }, []);

  return (
    <Screen style={styles.container}>
      <LiAHeader safeTop title={"Cài đặt"} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Column margin={8 * 2}>
          <Text weight="bold">Yêu cầu quyền truy cập</Text>
        </Column>

        <Column gap={8}>
          <CardSetting
            enabled={perNotifi == RESULTS.GRANTED}
            title={"Thông báo"}
            description={"Thông báo tin nhắn mới và các sự kiện ưu đãi"}
            onUpdate={handleNotifcationUpdate}
          />

          <CardSetting
            enabled={microPermission === RESULTS.GRANTED}
            title={"Micro"}
            description={"Micro phone được sử dụng để đàm thoại với bác sĩ"}
            onUpdate={_handleOnMicro}
          />

          <CardSetting
            enabled={galleryPermission === RESULTS.GRANTED}
            title={"Thư viện ảnh"}
            description={"Thông báo tin nhắn mới và các sự kiện ưu đãi"}
            onUpdate={_handleOnGallery}
          />

          <CardSetting
            onUpdate={_handleOnCamera}
            enabled={cameraPermission === RESULTS.GRANTED}
            title={"Camera"}
            description={
              "Camera được sử dụng để quét QR code, nhắn tin bằng hình ảnh và tải ảnh hậu phẫu"
            }
          />

          <TouchableOpacity onPress={_handleDeleteAccount}>
            <Row justifyContent="space-between" style={styles.btnDeleteAccount}>
              <Text>Yêu cầu xoá tài khoản</Text>
              <IconRightArrowBase color={BASE_COLOR} />
            </Row>
          </TouchableOpacity>
        </Column>

        <TouchableOpacity style={styles.btnLogout} onPress={_handleLogOut}>
          <Text weight="bold" color={BASE_COLOR}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

export default NewSettingApp;

const styles = StyleSheet.create({
  btnLogout: {
    marginHorizontal: 8 * 2,
    height: 8 * 6,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BASE_COLOR,
    marginTop: 8 * 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDeleteAccount: {
    marginHorizontal: 8 * 2,
    padding: 8 * 2,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  container: {
    backgroundColor: "#F1FCF9",
  },
  contentContainer: {
    paddingBottom: 60,
  },
});
