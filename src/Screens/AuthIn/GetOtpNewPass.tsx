import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Screen from "@Components/Screen";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import Header from "./components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesFont } from "@Constant/Font";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import ResendOtp from "./components/ResendOtp";
import * as Color from "../../Constant/Color";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationParams } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import usePhoneAuth from "src/Hooks/usePhoneAuth";
import {
  firebaseResetPassword,
  forceVerifyAccount,
  loginInApp,
  verifyAccount,
} from "@Redux/Action/AuthAction";
import { navigation } from "../../../rootNavigation";
import Column from "@Components/Column";
import PasswordInput from "@Components/PasswordInput";
import Spacer from "@Components/Spacer";
import { delay } from "src/utils/common";
import Toast from "react-native-toast-message";
import { changePass, requestOTPResetPass, resendOTP, resetStateChangePass, resetVerifyOtpResetPass, verifyOtpResetPass } from "@Redux/otp/actions";
import { getStateChangePass, getStateResendOTP, getStateVerifyOtpResetPass } from "@Redux/otp/selectors";
import Row from "@Components/Row";
import Text from "@Components/Text";

type ScreenK = typeof ScreenKey.GET_OTP_NEW_PASS;

const GetOtpNewPass = (props: any) => {
  const dispatch = useDispatch();
  const [activeCode, setActiveCode] = useState("");
  const resentCount = useRef(0);
  const resendRef = useRef<any>();
  const { fullPhone, phoneNumber, routeName, nationCode } =
    useNavigationParams<ScreenK>();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");

  const [isWrongOTP, setIsWrongOTP] = useState(false);

  const [isVerified, setIsVerified] = useState(false);

  const { isLoading, isSuccess, message } = useSelector(getStateVerifyOtpResetPass)

  const { isLoading: loadingChangePass, isSuccess: isSuccessChangePass, message: messageChangePass } = useSelector(getStateChangePass)

  const { isLoading: loadingResend, message: messageResend, isSuccess: isSuccessResend } = useSelector(getStateResendOTP)

  useEffect(() => {
    return () => {
      dispatch(resetVerifyOtpResetPass.request())
      dispatch(resetStateChangePass.request())
    }
  }, [])

  const validatePassword = () => {
    if (!password.trim()) {
      setErrorPassword("Vui lòng nhập mật khẩu");
      return false;
    } else if (password.trim().length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    } else {
      setErrorPassword("");
      return true;
    }
  };

  const validatePassword2 = () => {
    if (password.trim()) {
      if (!password2.trim()) {
        setErrorPassword2("Vui lòng xác nhận lại mật khẩu");
        return false;
      } else if (password.trim() !== password2.trim()) {
        setErrorPassword2("Nhập lại mật khẩu không trùng khớp");
        return false;
      } else {
        setErrorPassword2("");
        return true;
      }
    } else {
      setErrorPassword2("");
      return true;
    }
  };
  const validation = () => {
    var isContinue = true;

    if (!validatePassword()) {
      isContinue = false;
    }

    if (!validatePassword2()) {
      isContinue = false;
    }

    return isContinue;
  };
  const _handleChangeNewPassword = async () => {
    if (!validation()) {
      return;
    }

    dispatch(changePass.request({
      code: activeCode,
      password: password,
      phone: {
        nationCode: nationCode,
        phoneNumber: fullPhone,
      },
      type: "RESET_PASSWORD"
    }))
  };

  const confirmVerificationCode = (code: string) => {
    if (code.length === 6) {
      dispatch(verifyOtpResetPass.request({
        code: code,
        phone: {
          nationCode: nationCode,
          phoneNumber: fullPhone,
        },
        type: "RESET_PASSWORD"
      }))
    }
  }

  const _reSendOTP = async () => {
    dispatch(resendOTP.request({
      phone: {
        nationCode: nationCode.includes("+") ? nationCode : ("+" + nationCode),
        phoneNumber: fullPhone,
      },
      type: "RESET_PASSWORD"
    }))

  }

  useEffect(() => {
    if (!isLoading && isSuccess === true) {
      setActiveCode("")
      setIsWrongOTP(false)
      if (resendRef.current) {
        resendRef.current.setCounter(150);
      }
    }
  }, [isSuccessResend, loadingResend, messageResend])


  useEffect(() => {
    if (!isLoading && isSuccess === false) {
      setIsWrongOTP(true)
    }
    if (!isLoading && isSuccess === true) {
      setIsWrongOTP(false)
      setIsVerified(true)
    }
  }, [isSuccess, isLoading, message])

  useEffect(() => {
    if (!isLoading && isSuccess === true) {
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
          props?.route?.params?.routeName
        )
      );
    }
  }, [isSuccessChangePass, loadingChangePass, messageChangePass])

  return isVerified ? (
    <Screen safeTop style={styles.container}>
      <Header title="Tạo mật khẩu mới" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        enableOnAndroid={true}
      >
        <Column
          gap={_moderateScale(8 * 2)}
          style={{
            paddingHorizontal: _moderateScale(8 * 2),
            marginTop: _moderateScale(8 * 8),
          }}
        >
          <PasswordInput
            content={password}
            errorMessage={errorPassword}
            label="Nhập mật khẩu mới"
            onBlur={validatePassword}
            onChangeText={setPassword}
          />
          <PasswordInput
            content={password2}
            errorMessage={errorPassword2}
            label="Xác nhận mật khẩu mới"
            onBlur={validatePassword2}
            onChangeText={setPassword2}
          />
          <Spacer top={_moderateScale(8 * 4)} />
          <TouchableOpacity
            onPress={_handleChangeNewPassword}
            style={[
              {
                height: _moderateScale(8 * 6),
                borderRadius: _moderateScale(8),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.BG_LOGIN_BUTTON,
              },
            ]}
          >
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(16), color: Color.WHITE },
              ]}
            >
              Lưu mật khẩu
            </Text>
          </TouchableOpacity>
        </Column>
      </KeyboardAwareScrollView>
      <Row
        justifyContent="flex-end"
        paddingBottom={_moderateScale(8)}
        alignSelf="center"
      >
        <Text
          color={Color.GREY}
          fontStyle="italic"
        >
          Copyright © Lia Beauty 2023
        </Text>
      </Row>
    </Screen>
  ) : (
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
          {props?.route?.params?.nationCode}
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
          autoFocusOnLoad={false}
        />
        <ResendOtp ref={resendRef} onResend={_reSendOTP} />
        <TouchableOpacity onPress={() => confirmVerificationCode(activeCode)}>
          <Row backgroundColor={Color.BASE_COLOR} padding={_moderateScale(10)} marginVertical={_moderateScale(40)} marginHorizontal={_moderateScale(50)} borderRadius={_moderateScale(5)}>
            <Text style={{ textAlign: "center" }} flex={1} color={Color.WHITE} size={_moderateScale(14)} weight="bold">
              Xác thực
            </Text>
          </Row>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Row
        justifyContent="flex-end"
        paddingBottom={_moderateScale(8)}
        alignSelf="center"
      >
        <Text
          color={Color.GREY}
          fontStyle="italic"
        >
          Copyright © Lia Beauty 2023
        </Text>
      </Row>
    </Screen>
  );
};

export default GetOtpNewPass;

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
