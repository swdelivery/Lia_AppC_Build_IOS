import React, { useState, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
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
import { alertCustomNotAction } from "../../Constant/Utils";
import { verifyAccount } from "../../Redux/Action/AuthAction";
import usePhoneAuth from "../../Hooks/usePhoneAuth";
import ResendOtp from "./components/ResendOtp";
import { delay } from "../../utils/common";
import { useNavigationParams } from "src/Hooks/useNavigation";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import Header from "./components/Header";

type ScreenK = typeof ScreenKey.ACTIVATION_IN_APP;

const ActivationInApp = (props: any) => {
  const dispatch = useDispatch();
  const [activeCode, setActiveCode] = useState("");
  const resentCount = useRef(0);
  const resendRef = useRef<any>();
  const { fullPhone, phoneNumber, password, routeName, nationCode } =
    useNavigationParams<ScreenK>();
  const [isWrongOTP, setIsWrongOTP] = useState(false);

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
            nationCode: nationCode,
          },
        });
        if (resultVerifyAccount?.isAxiosError) {
          return navigation.navigate(ScreenKey.LOGIN_IN_APP, {});
        }

        auth().signOut();
        dispatch(
          loginInApp(
            {
              phone: {
                phoneNumber: fullPhone,
                nationCode: nationCode,
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
        setIsWrongOTP(true);
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

    if (resentCount.current < 1) {
      verifyPhoneNumber();
      resentCount.current++;
      return;
    }

    auth().signOut();

    let result = await forceVerifyAccount({
      phone: {
        phoneNumber: props?.route?.params?.fullPhone,
        nationCode: nationCode,
      },
    });
    if (result?.isAxiosError) return;

    dispatch(
      loginInApp(
        {
          phone: {
            phoneNumber: props?.route?.params?.fullPhone,
            nationCode: nationCode,
          },
          password: props?.route?.params?.password,
          appName: "CS_APP",
        },
        props?.route?.params?.routeName
      )
    );
  }, [verifyPhoneNumber]);

  return (
    <Screen safeTop style={styles.container}>
      <Header title="Xác thực OTP" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
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
          codeInputFieldStyle={
            isWrongOTP
              ? styles.underlineStyleBaseError
              : styles.underlineStyleBase
          }
          onCodeFilled={confirmVerificationCode}
          onCodeChanged={setActiveCode}
          autoFocusOnLoad={true}
        />
        <ResendOtp ref={resendRef} onResend={_reSendOTP} />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  underlineStyleBase: {
    ...stylesFont.fontNolan,
    width: _moderateScale(8 * 5),
    height: 45,
    borderWidth: 1,
    fontSize: _moderateScale(22),
    color: Color.BLACK,
  },
  underlineStyleBaseError: {
    ...stylesFont.fontNolan,
    width: _moderateScale(8 * 5),
    height: 45,
    borderWidth: 1,
    borderColor: Color.ERROR_COLOR,
    fontSize: _moderateScale(22),
    color: Color.BLACK,
  },

  underlineStyleHighLighted: {
    borderWidth: 1,
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
  headerContainer: {
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8 * 2),
    paddingBottom: 8,
  },
});

export default ActivationInApp;
