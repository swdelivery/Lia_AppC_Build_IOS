import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
import Text from "@Components/Text";
import Header from "./components/Header";
import Row from "@Components/Row";
import PasswordInput from "@Components/PasswordInput";

const Login = (props) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nationCode, setNationCode] = useState("+84");

  // validate
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    _getUsernamePassword();
  }, []);

  const _getUsernamePassword = async () => {
    let userName = await AsyncStorage.getItem("userName");
    setphoneNumber(userName);
    let password = await AsyncStorage.getItem("password");
    setPassword(password);
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setErrorPhoneNumber("Vui lòng nhập số điện thoại");
    } else {
      setErrorPhoneNumber("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setErrorPassword("Vui lòng nhập mật khẩu");
    } else if (password.length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
    } else {
      setErrorPassword("");
    }
  };

  const validation = () => {
    var isContinue = true;
    validatePassword();
    validatePhoneNumber();
    if (!phoneNumber) {
      isContinue = false;
    }

    if (!password || password.length < 6) {
      isContinue = false;
    }

    return isContinue;
  };

  const fetchData = async () => {
    // dispatch(fetchAllData())

    // console.log(getCountryCallingCode());

    // return
    if (!phoneNumber || !password) {
      return alert("Nhập đầy đủ thông tin");
    }

    dispatch(
      loginInApp(
        {
          phone: {
            phoneNumber: phoneNumber,
            nationCode: nationCode,
          },
          password: password,
          appName: "CS_APP",
        },
        props?.route?.params?.routeName
      )
    );

    // console.log({resultLogin});

    // return

    // let resultGetAllDataServiceRevunue = await handleApi(_getAllDataServiceReveunue());
    // if (resultGetAllDataServiceRevunue.error) return

    // let resultGetAllDataBranchRevenue = await handleApi(_getAllDataBranchRevenue());
    // if (resultGetAllDataBranchRevenue.error) return

    // let resultGetAllDataCostPart = await handleApi(_getAllDataCostPart())
    // if (resultGetAllDataCostPart.error) return

    // let resultGetAllDataCostItem = await handleApi(_getAllDataCostItem())
    // if (resultGetAllDataCostItem.error) return

    // Store.dispatch({
    //     type: ActionType.SAVE_LIST_REVENUE_BRANCH,
    //     payload: resultGetAllDataBranchRevenue.data
    // })
    // Store.dispatch({
    //     type: ActionType.SAVE_LIST_REVENUE_SERVICE,
    //     payload: resultGetAllDataServiceRevunue.data
    // })
    // Store.dispatch({
    //     type: ActionType.SAVE_LIST_COST_PART,
    //     payload: resultGetAllDataCostPart.data
    // })
    // Store.dispatch({
    //     type: ActionType.SAVE_LIST_COST_ITEM,
    //     payload: resultGetAllDataCostItem.data
    // })

    // Store.dispatch({
    //     type: ActionType.LOADING_DONE,
    //     payload: null
    // })
    // Store.dispatch({
    //     type: ActionType.LOGIN,
    //     payload: {
    //         flag: true
    //     }
    // })
  };
  return (
    <Screen safeTop style={styles.container}>
      <Header title="" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
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
        <View style={{ height: _moderateScale(8 * 2) }} />

        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
          <View>
            {phoneNumber ? (
              <View style={styles.labelContainer}>
                <Text size={14} color={Color.GREY}>
                  Số điện thoại đã đăng kí
                </Text>
              </View>
            ) : (
              <></>
            )}
            <Row
              paddingVertical={_moderateScale(8 * 2)}
              borderRadius={_moderateScale(8)}
              borderColor={
                errorPhoneNumber
                  ? Color.ERROR_COLOR
                  : phoneNumber
                  ? Color.BORDER_INPUT_TEXT_FOCUSED
                  : Color.BORDER_INPUT_TEXT
              }
              borderWidth={1}
              paddingHorizontal={10}
            >
              <TextInput
                value={phoneNumber}
                keyboardType={"number-pad"}
                onChangeText={setphoneNumber}
                style={styles.input_text}
                placeholder={"Số điện thoại đã đăng kí"}
                placeholderTextColor={"grey"}
                onBlur={validatePhoneNumber}
              />
            </Row>
            <Text style={[{ ...stylesFont.fontNolan }, styles.error_text]}>
              {errorPhoneNumber}
            </Text>
          </View>
          <View style={{ height: _moderateScale(8 * 2) }} />
          <PasswordInput
            content={password}
            label="Nhập mật khẩu"
            errorMessage={errorPassword}
            onBlur={validatePassword}
            onChangeText={setPassword}
          />

          <View style={{ height: _moderateScale(10 * 8) }} />

          <TouchableOpacity
            onPress={() => {
              if (validation()) {
                fetchData();
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
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={{ height: _moderateScale(8 * 0.5) }} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenKey.FILL_PHONE_TO_GET_NEW_PASS, {
                routeName: props?.route?.params?.routeName,
              });
            }}
            style={[
              {
                height: _moderateScale(8 * 6),
                backgroundColor: "transparent",
                borderRadius: _moderateScale(8),
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text
              style={[
                stylesFont.fontNolanBold,
                {
                  fontSize: _moderateScale(14),
                  color: Color.TEXT_COLOR_FORGET_PASS,
                },
              ]}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
          <View style={{ height: _moderateScale(8 * 2) }} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignSelf: "center",
            paddingBottom: _moderateScale(10),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenKey.REGISTER_IN_APP, {
                routeName: props?.route?.params?.routeName,
              });
            }}
            style={[
              {
                backgroundColor: "transparent",
              },
            ]}
          >
            <Text
              style={[
                stylesFont.fontNolan,
                { fontSize: _moderateScale(14), color: Color.GREY },
              ]}
            >
              Bạn chưa có tài khoản?{" "}
              {
                <Text
                  style={[
                    stylesFont.fontNolanBold,
                    {
                      fontSize: _moderateScale(14),
                      color: Color.TEXT_COLOR_FORGET_PASS,
                    },
                  ]}
                >
                  Đăng ký ngay
                </Text>
              }
            </Text>
          </TouchableOpacity>
        </View>
        <Row
          justifyContent="flex-end"
          paddingBottom={_moderateScale(32)}
          alignSelf="center"
        >
          <Text
            style={[
              stylesFont.fontDinTextPro,
              { color: Color.BLACK, fontSize: _moderateScale(12) },
            ]}
          >
            Copyright © Lia Beauty 2023.
          </Text>
        </Row>
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
  labelContainer: {
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
  error_text: {
    color: Color.ERROR_COLOR,
    marginHorizontal: 10,
    fontStyle: "italic",
    marginVertical: 5,
  },
  input_text: {
    ...stylesFont.fontNolan,
    fontSize: _moderateScale(14),
    paddingVertical: 0,
    flex: 1,
    color: Color.BLACK,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 3,
};

export default Login;
