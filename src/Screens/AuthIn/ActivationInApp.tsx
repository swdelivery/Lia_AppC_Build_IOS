import React, { useState, useEffect, useCallback, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import { loginInApp, forceVerifyAccount } from "../../Redux/Action/AuthAction";
import { navigation } from "../../../rootNavigation";
import _ from "lodash";
import ScreenKey from "../../Navigation/ScreenKey";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import { alertCustomNotAction } from "../../Constant/Utils";
import { verifyAccount } from "../../Redux/Action/AuthAction";
import { styleElement } from "../../Constant/StyleElement";
import { sizeIcon } from "../../Constant/Icon";
import usePhoneAuth from "../../Hooks/usePhoneAuth";
import ResendOtp from "./components/ResendOtp";
import { delay } from "../../utils/common";
import { useNavigationParams } from "src/Hooks/useNavigation";

type ScreenK = typeof ScreenKey.ACTIVATION_IN_APP;

const ActivationInApp = (props: any) => {
  const dispatch = useDispatch();
  const [activeCode, setActiveCode] = useState("");
  const resendRef = useRef<any>();
  const { fullPhone, phoneNumber, password, routeName } =
    useNavigationParams<ScreenK>();

  const handleUserLogin = useCallback(
    async (
      user: FirebaseAuthTypes.User,
      token: FirebaseAuthTypes.IdTokenResult
    ) => {
      if (token.token) {
        let resultVerifyAccount = await verifyAccount({
          idToken: token.token,
          phone: {
            phoneNumber: props?.route?.params?.fullPhone,
            nationCode: "+84",
          },
        });
        if (resultVerifyAccount?.isAxiosError) {
          auth().signOut();
          return navigation.navigate(ScreenKey.LOGIN_IN_APP);
        }

        auth().signOut();
        dispatch(
          loginInApp(
            {
              phone: {
                phoneNumber: fullPhone,
                nationCode: "+84",
              },
              password: password,
              appName: "CS_APP",
            },
            routeName
          )
        );
      }
    },
    [props?.route?.params]
  );

  const { confirmCode, verifyPhoneNumber } = usePhoneAuth(
    phoneNumber,
    handleUserLogin
  );

  const confirmVerificationCode = useCallback(
    async (code: string) => {
      try {
        await confirmCode(code);
        setActiveCode("");
      } catch (error) {
        alertCustomNotAction(`Lỗi`, `OTP sai`);
      }
    },
    [confirmCode]
  );

  const _reSendOTP = useCallback(async () => {
    setActiveCode("");
    if (resendRef.current) {
      resendRef.current.setCounter(90);
    }
    await delay(3000);

    verifyPhoneNumber();
    // auth().signOut();

    // let result = await forceVerifyAccount({
    //   phone: {
    //     phoneNumber: props?.route?.params?.fullPhone,
    //     nationCode: "+84",
    //   },
    // });
    // if (result?.isAxiosError) return;

    // dispatch(
    //   loginInApp(
    //     {
    //       phone: {
    //         phoneNumber: props?.route?.params?.fullPhone,
    //         nationCode: "+84",
    //       },
    //       password: props?.route?.params?.password,
    //       appName: "CS_APP",
    //     },
    //     props?.route?.params?.routeName
    //   )
    // );
  }, [verifyPhoneNumber]);

  return (
    <>
      <StatusBarCustom bgColor={"white"} barStyle={"dark-content"} />

      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.container}>
          <View
            style={[
              styleElement.rowAliCenter,
              {
                justifyContent: "space-between",
                marginTop: _moderateScale(8 * 2),
                paddingHorizontal: _moderateScale(8 * 2),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={styleElement.hitslopSm}
            >
              <Image
                style={sizeIcon.lg}
                source={require("../../NewIcon/backBold.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...stylesFont.fontNolanBold,
                fontSize: _moderateScale(16),
              }}
            >
              Xác thực OTP
            </Text>
            <View style={sizeIcon.lg} />
          </View>
          <Text
            style={{
              ...stylesFont.fontNolan500,
              fontSize: _moderateScale(12),
              color: Color.GREY,
              alignSelf: "center",
              marginTop: _moderateScale(8 * 4),
            }}
          >
            Mã xác thực OTP đã được gửi đến số điện thoại
          </Text>
          <Text
            style={{
              ...stylesFont.fontNolanBold,
              fontSize: _moderateScale(16),
              color: Color.BLACK_OPACITY_7,
              alignSelf: "center",
              marginTop: _moderateScale(8 * 1),
            }}
          >
            {props?.route?.params?.fullPhone}
          </Text>
          <OTPInputView
            style={{ width: "80%", height: 100, alignSelf: "center" }}
            pinCount={6}
            code={activeCode}
            codeInputFieldStyle={[
              styles.underlineStyleBase,
              { fontSize: _moderateScale(22), color: Color.BASE_COLOR },
              stylesFont.fontNolanBold,
            ]}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={confirmVerificationCode}
            onCodeChanged={setActiveCode}
            autoFocusOnLoad={true}
          />
          <ResendOtp ref={resendRef} onResend={_reSendOTP} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    width: _moderateScale(8 * 5),
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: Color.BASE_COLOR,
  },

  underlineStyleHighLighted: {
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: Color.BASE_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  input: {
    width: _widthScale(240),
    color: Color.GREY,
    padding: 0,
    fontSize: _widthScale(12),
    paddingHorizontal: _widthScale(0),
    margin: 0,
  },
  inputActiveCode: {
    minWidth: 45,
    borderColor: Color.BASE_COLOR,
    color: Color.GREY,
    borderBottomWidth: 3,
    fontSize: _moderateScale(32),
    textAlign: "center",
  },
  rowOfNumber: {
    height: _moderateScale(80),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNumber: {
    justifyContent: "center",
    fontSize: 40,
    width: 80,
    textAlign: "center",
    color: Color.BASE_COLOR,
  },
});

export default ActivationInApp;
