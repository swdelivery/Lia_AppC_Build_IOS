import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import { loginInApp } from "../../Redux/Action/AuthAction";
import { navigation } from "../../../rootNavigation";
import _ from "lodash";
import ScreenKey from "../../Navigation/ScreenKey";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import ResendOtp from "./components/ResendOtp";
import { delay } from "../../utils/common";
import { useNavigationParams } from "src/Hooks/useNavigation";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import Header from "./components/Header";
import Row from "@Components/Row";
import Column from "@Components/Column";
import {
  resendOTP,
  resetVerifyAccount,
  verifyOtpAccountpartner,
} from "@Redux/otp/actions";
import { getStateVerifyOtpAccountPartner } from "@Redux/otp/selectors";

type ScreenK = typeof ScreenKey.ACTIVATION_IN_APP;

const ActivationInApp = (props: any) => {
  const dispatch = useDispatch();
  const [activeCode, setActiveCode] = useState("");
  const resentCount = useRef(0);
  const resendRef = useRef<any>();
  const { fullPhone, phoneNumber, password, routeName, nationCode } =
    useNavigationParams<ScreenK>();
  const [isWrongOTP, setIsWrongOTP] = useState(false);

  const { isLoading, isSuccess, message } = useSelector(
    getStateVerifyOtpAccountPartner
  );

  const confirmVerificationCode = () => {
    if (activeCode.length === 6) {
      dispatch(
        verifyOtpAccountpartner.request({
          code: activeCode,
          phone: {
            nationCode: nationCode.includes("+")
              ? nationCode
              : "+" + nationCode,
            phoneNumber: fullPhone,
          },
        })
      );
    }
  };

  useEffect(() => {
    dispatch(resetVerifyAccount.request());
    if (props?.route?.params?.isLogin === true) {
      _handleResendOTP();
    }
  }, []);

  const handleLoginBtn = () => {
    navigation.navigate(ScreenKey.LOGIN_IN_APP, {
      routeName: props?.route?.params?.routeName,
    });
  };

  const _handleResendOTP = async () => {
    setActiveCode("");
    setIsWrongOTP(false);
    if (resendRef.current) {
      resendRef.current.setCounter(150);
    }
    await delay(3000);
    dispatch(
      resendOTP.request({
        phone: {
          nationCode: nationCode.includes("+") ? nationCode : "+" + nationCode,
          phoneNumber: fullPhone,
        },
        type: "VERIFY_ACCOUNT",
      })
    );
  };

  useEffect(() => {
    if (!isLoading && isSuccess === false) {
      setIsWrongOTP(true);
    }
    if (!isLoading && isSuccess === true) {
      dispatch(
        loginInApp(
          {
            phone: {
              phoneNumber: fullPhone,
              nationCode: nationCode.includes("+")
                ? nationCode
                : "+" + nationCode,
            },
            password: password,
            appName: "CS_APP",
          },
          props?.route?.params?.routeName
        )
      );
    }
  }, [isSuccess, isLoading, message]);

  return (
    <Screen safeBottom safeTop style={styles.container}>
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
          {nationCode}
          {fullPhone}
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
          onCodeChanged={setActiveCode}
          autoFocusOnLoad={false}
        />
        <ResendOtp ref={resendRef} onResend={_handleResendOTP} />

        <TouchableOpacity onPress={confirmVerificationCode}>
          <Row
            backgroundColor={Color.BASE_COLOR}
            padding={_moderateScale(10)}
            marginVertical={_moderateScale(40)}
            marginHorizontal={_moderateScale(50)}
            borderRadius={_moderateScale(8 * 3)}
          >
            <Text
              style={{ textAlign: "center" }}
              flex={1}
              color={Color.WHITE}
              size={_moderateScale(14)}
              weight="bold"
            >
              Xác thực
            </Text>
          </Row>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Column
        flex={1}
        justifyContent="flex-end"
        alignSelf="center"
        paddingTop={_moderateScale(64)}
        marginBottom={_moderateScale(10)}
      >
        <TouchableOpacity onPress={handleLoginBtn}>
          <Text color={Color.GREY}>
            {"Bạn đã có tài khoản, "}
            <Text weight="bold" size={14} color={Color.BASE_COLOR}>
              Đăng nhập ngay
            </Text>
          </Text>
        </TouchableOpacity>
      </Column>
      <Row
        justifyContent="flex-end"
        paddingBottom={_moderateScale(8)}
        alignSelf="center"
      >
        <Text color={Color.GREY} fontStyle="italic">
          Copyright © Lia Beauty 2023
        </Text>
      </Row>
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
