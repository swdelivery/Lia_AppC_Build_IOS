import React, { useState, useEffect, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
  _width,
  _height,
} from "../../Constant/Scale";
import { loginInApp } from "../../Redux/Action/AuthAction";
import ScreenKey from "../../Navigation/ScreenKey";
import { navigation } from "../../../rootNavigation";
import AsyncStorage from "@react-native-community/async-storage";
import { styleElement } from "../../Constant/StyleElement";
import Screen from "@Components/Screen";
import Header from "./components/Header";
import PhoneInput from "@Components/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import Column from "@Components/Column";
import Spacer from "@Components/Spacer";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { requestOTPResetPass, resetStateRequestResetPass } from "@Redux/otp/actions";
import { getStateRequestResetPass } from "@Redux/otp/selectors";

const FillPhoneToGetNewPass = (props) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [countryCallingCode, setCountryCallingCode] = useState("84");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const { isLoading, isSuccess, message } = useSelector(getStateRequestResetPass)

  const dispatch = useDispatch();

  useEffect(() => {
    _getUsernamePassword();
    return () => {
      dispatch(resetStateRequestResetPass())
    }
  }, []);

  const _getUsernamePassword = async () => {
    let userName = await AsyncStorage.getItem("userName");
    setphoneNumber(userName);
  };

  useMemo(() => {
    if (!isLoading && isSuccess) {
      let newFormatPhone = phoneNumber;

      if (newFormatPhone.charAt(0) == "0") {
        newFormatPhone = `${newFormatPhone.substring(
          1
        )}`;
      } else {
        newFormatPhone = `${newFormatPhone}`;
      }

      navigation.navigate(ScreenKey.GET_OTP_NEW_PASS, {
        phoneNumber: newFormatPhone,
        fullPhone: newFormatPhone,
        routeName: props?.route?.params?.routeName,
        nationCode: "+" + countryCallingCode,
      });
    }
  }, [isLoading, isSuccess, message])

  const validatePhoneNumber = () => {
    const numberRegex = /^[0-9]+$/;
    if (!phoneNumber) {
      setErrorPhoneNumber("Vui lòng nhập số điện thoại");
      return false;
    } else if (!isValidPhoneNumber("+" + countryCallingCode + phoneNumber) || !numberRegex.test(phoneNumber)) {
      setErrorPhoneNumber("Số điện thoại không hợp lệ");
      return false;
    } else {
      setErrorPhoneNumber("");
      return true;
    }
  };

  const _handleOnPressContinue = async () => {
    if (validatePhoneNumber()) {
      let newFormatPhone = phoneNumber;

      if (newFormatPhone.charAt(0) == "0") {
        newFormatPhone = `${newFormatPhone.substring(
          1
        )}`;
      } else {
        newFormatPhone = `${newFormatPhone}`;
      }

      return dispatch(requestOTPResetPass.request({
        phone: {
          nationCode: "+" + countryCallingCode,
          phoneNumber: newFormatPhone,
        },
        type: "RESET_PASSWORD"
      }))

    }
  }



  return (
    <Screen style={styles.container} safeTop safeBottom>
      <Header title="Quên mật khẩu" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
        }}
        enableOnAndroid={true}
      >
        <View style={{ height: _moderateScale(8 * 2) }} />
        <Column
          alignItems="center"
          marginTop={8 * 8}
          height={_moderateScale(8 * 15)}
          margin={_moderateScale(8 * 2)}
        >
          <Image
            resizeMode={"contain"}
            style={{ width: "70%", height: "70%" }}
            source={require("../../NewImage/logoLiA.png")}
          />
        </Column>
        <Spacer top={_moderateScale(8 * 10)} />
        <Column paddingHorizontal={_moderateScale(8 * 2)}>
          <PhoneInput
            autoFocus
            content={phoneNumber}
            countryCallingCode={countryCallingCode}
            errorMessage={errorPhoneNumber}
            label="Số điện thoại đã đăng ký"
            onBlur={validatePhoneNumber}
            onChangeText={setphoneNumber}
            onSelectionCallingCode={setCountryCallingCode}
          />
          <View style={{ height: _moderateScale(8 * 4) }} />
          <TouchableOpacity
            onPress={_handleOnPressContinue}
            style={[
              {
                height: _moderateScale(8 * 5),
                borderRadius: _moderateScale(8 * 3),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.BG_LOGIN_BUTTON,
                marginHorizontal: 8 * 10
              },
            ]}
          >
            <Text
              style={[
                stylesFont.fontNolanBold,
                { fontSize: _moderateScale(14), color: Color.WHITE },
              ]}
            >
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </Column>
        <View style={{ height: _moderateScale(8 * 0.5) }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  input: {
    // width: _widthScale(240),
    flex: 1,
    color: Color.SECOND_COLOR,
    padding: 0,
    fontSize: _widthScale(16),
    paddingHorizontal: _widthScale(0),
    margin: 0,
  },
  containInput: {
    marginBottom: _heightScale(8 * 3),
    borderColor: Color.BG_MAIN_OPACITY,
    borderWidth: 1,
    height: _moderateScale(48),
    // paddingLeft: _moderateScale(16),
    // justifyContent: 'center',
    borderRadius: _moderateScale(25),
    backgroundColor: Color.BG_MAIN_OPACITY,
  },
  active: {
    borderColor: Color.SECOND_COLOR,
  },
});

export default FillPhoneToGetNewPass;
