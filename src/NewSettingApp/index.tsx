import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '@Components/Screen'
import Header from '@Components/NewHeader/Header'
import Column from '@Components/Column'
import Text from '@Components/Text'
import CardSetting from './Components/CardSetting'
import {
  Permission,
  PERMISSION_TYPE,
  REQUEST_PERMISSION_TYPE,
} from "../PermissionConfig/PermissionConfig";
import { checkNotifications } from "react-native-permissions";
import { openSettings, RESULTS } from "react-native-permissions";
import Row from '@Components/Row'
import { IconArrowDown, IconArrowRightRed, IconRightArrow, IconRightArrowBase, IconRightWhite } from '@Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, WHITE } from '@Constant/Color'
import useConfirmation from 'src/Hooks/useConfirmation'
import { removeAccount } from '@Redux/Action/ProfileAction'
import store from '@Redux/store'
import * as ActionType from "../Redux/Constants/ActionType";
import AsyncStorage from "@react-native-community/async-storage";
import { partnerAccountLogout } from '@Redux/Action/AuthAction'
import keychain from "src/utils/keychain";
import SocketInstance from "../../SocketInstance";
import { useNavigate } from 'src/Hooks/useNavigation'
import { useSelector } from 'react-redux'
import Button from '@Components/Button/Button'
import ScreenKey from '@Navigation/ScreenKey'

const NewSettingApp = () => {
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);

  const [perMicro, setPerMicro] = useState(null);
  const [perGallery, setPerGallery] = useState(null);
  const [perCamera, setPerCamera] = useState(null);
  const [perNotifi, setPerNotifi] = useState(null);

  const { showConfirmation } = useConfirmation();

  const { navigate } = useNavigate()

  useEffect(() => {
    _checkPer();

  }, []);

  console.log({
    perMicro,
    perGallery,
    perCamera,
    perNotifi,
  });


  const _checkPer = async () => {
    let resultPerMicro = await Permission.checkPermission(
      PERMISSION_TYPE.microphone
    );
    setPerMicro(resultPerMicro);

    let resultPerGallery = await Permission.checkPermission(
      PERMISSION_TYPE.gallery
    );
    setPerGallery(resultPerGallery);

    let resultPerCamera = await Permission.checkPermission(
      PERMISSION_TYPE.camera
    );
    setPerCamera(resultPerCamera);

    checkNotifications().then(({ status, settings }) => {
      console.log({ status, settings });
      setPerNotifi(status);
    });
  };

  const _handleOnCamera = async () => {
    console.log({ ON: "ON" });

    if (perCamera == RESULTS.BLOCKED) {
      return openSettings();
    }
    let result = await Permission.requestPermission(
      REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.camera][Platform.OS]
    );
    if (result == RESULTS.GRANTED) {
      return setPerCamera(result);
    }
    if (result == RESULTS.BLOCKED) {
      return;
    }
    openSettings();
  }
  const _handleOnGallery = async () => {
    openSettings();
    if (perGallery == RESULTS.BLOCKED) {
      return openSettings();
    }
    let result = await Permission.requestPermission(
      REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.gallery][
      Platform.OS
      ]
    );
    if (result == RESULTS.GRANTED) {
      return setPerGallery(result);
    }
    if (result == RESULTS.BLOCKED) {
      return;
    }

  }

  const _handleDeleteAccount = () => {
    showConfirmation(
      'Bạn có chắn chắn muốn xoá tài khoản?',
      'Tài khoản của bạn sẽ bị xoá vĩnh viễn. \n Thông tin đơn hàng và các thông tin khác cũng sẽ bị xoá.',
      async () => {
        let result = await removeAccount(infoUserRedux?._id);
        if (result?.isAxiosError) return;
        _handleLogOut();
      }
    );
  }

  const _handleLogOut = async () => {
    store.dispatch({
      type: ActionType.LOG_OUT,
    });
    let fcmTokenSTR = await AsyncStorage.getItem("fcmToken");
    let result = await partnerAccountLogout({
      fcmToken: fcmTokenSTR,
    });
    if (result?.isAxiosError) return;

    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("codeAffiliateVsIdService");
    keychain.clearTokens();

    setTimeout(() => {
      store.dispatch({
        type: ActionType.CLEAR_STORE_REDUX,
      });
    }, 0);
    SocketInstance.instance = null;
    SocketInstance.socketConn.disconnect();
    SocketInstance.socketConn = null;
    navigate(ScreenKey.HOME)();
  };

  return (
    <Screen style={styles.container}>
      <Header title={"Cài đặt"} />
      <ScrollView>
        <Column margin={8 * 2}>
          <Text weight='bold'>
            Yêu cầu quyền truy cập
          </Text>
        </Column>

        <Column gap={8}>
          <CardSetting
            enabled={perNotifi == RESULTS.GRANTED}
            title={'Thông báo'}
            description={'Thông báo tin nhắn mới và các sự kiện ưu đãi'} />

          <CardSetting
            enabled={perMicro == RESULTS.GRANTED}
            title={'Micro'}
            description={'Micro phone được sử dụng để đàm thoại với bác sĩ'} />

          <CardSetting
            handleOn={_handleOnGallery}
            enabled={perGallery == RESULTS.GRANTED}
            title={'Thư viện ảnh'}
            description={'Thông báo tin nhắn mới và các sự kiện ưu đãi'} />

          <CardSetting
            handleOn={_handleOnCamera}
            enabled={perCamera == RESULTS.GRANTED}
            title={'Camera'}
            description={'Camera được sử dụng để quét QR code, nhắn tin bằng hình ảnh và tải ảnh hậu phẫu'} />

          <TouchableOpacity
            onPress={_handleDeleteAccount}>
            <Row justifyContent='space-between' style={styles.btnDeleteAccount}>
              <Text>
                Yêu cầu xoá tài khoản
              </Text>
              <IconRightArrowBase />
            </Row>
          </TouchableOpacity>

        </Column>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={_handleLogOut}>
          <Text weight='bold' color={BASE_COLOR}>
            Đăng xuất
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </Screen>
  )
}

export default NewSettingApp

const styles = StyleSheet.create({
  btnLogout: {
    marginHorizontal: 8 * 2,
    height: 8 * 6,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BASE_COLOR,
    marginTop: 8 * 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnDeleteAccount: {
    marginHorizontal: 8 * 2,
    padding: 8 * 2,
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },
  container: {
    backgroundColor: '#F1FCF9'
  }
})
