import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
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

const FillPhoneToGetNewPass = (props) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [countryCallingCode, setCountryCallingCode] = useState("84");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    _getUsernamePassword();
  }, []);

  const _getUsernamePassword = async () => {
    let userName = await AsyncStorage.getItem("userName");
    setphoneNumber(userName);
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setErrorPhoneNumber("Vui lòng nhập số điện thoại");
      return false;
    } else if (!isValidPhoneNumber("+" + countryCallingCode + phoneNumber)) {
      setErrorPhoneNumber("Số điện thoại không hợp lệ");
      return false;
    } else {
      setErrorPhoneNumber("");
      return true;
    }
  };

  return (
    <Screen style={styles.container} safeTop>
      <Header title="Quên mật khẩu" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: _moderateScale(8 * 4),
        }}
        enableOnAndroid={true}
      >
        <View style={{ height: _moderateScale(8 * 2) }} />
        <View
          style={[
            {
              height: _moderateScale(8 * 20),
              borderWidth: 0,
              margin: _moderateScale(8 * 2),
              borderRadius: _moderateScale(8 * 2),
            },
            styleElement.centerChild,
          ]}
        >
          <Image
            resizeMode={"contain"}
            style={{ width: "70%", height: "70%" }}
            source={require("../../NewImage/NewLogoLogin.png")}
          />
        </View>
        <PhoneInput
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
          onPress={() => {
            if (validatePhoneNumber()) {
              let newFormatPhone = phoneNumber;

              if (newFormatPhone.charAt(0) == "0") {
                newFormatPhone = `+${countryCallingCode}${newFormatPhone.substring(
                  1
                )}`;
              } else {
                newFormatPhone = `+${countryCallingCode}${newFormatPhone}`;
              }
              return navigation.navigate(ScreenKey.GET_OTP_NEW_PASS, {
                phoneNumber: newFormatPhone,
                fullPhone: phoneNumber,
                routeName: props?.route?.params?.routeName,
                nationCode: "+" + countryCallingCode,
              });
            }
          }}
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
            Tiếp tục
          </Text>
        </TouchableOpacity>
        <View style={{ height: _moderateScale(8 * 0.5) }} />
      </KeyboardAwareScrollView>
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
