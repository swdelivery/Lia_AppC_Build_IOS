import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
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
import { login, loginInApp } from "../../Redux/Action/AuthAction";
import Button from "../../Components/Button/Button";
import ScreenKey from "../../Navigation/ScreenKey";
import { navigation } from "../../../rootNavigation";
import AsyncStorage from "@react-native-community/async-storage";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";

import { findPhoneNumbersInText } from "libphonenumber-js";
import { styleElement } from "../../Constant/StyleElement";
import { sizeIcon } from "../../Constant/Icon";
import { getBottomSpace } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import Header from "./components/Header";

const Login = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [focusInput, setFocusInput] = useState(null);
  const [nationCode, setNationCode] = useState("+84");

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
      <Header title="Đăng nhập" onBack={navigation.goBack} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
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
            source={require("../../NewImage/logoCenterBase.png")}
          />
        </View>
        <View style={{ height: _moderateScale(8 * 2) }} />

        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
          <View
            style={[
              {
                width: "100%",
                backgroundColor: Color.BG_GREY_OPACITY_2,
                paddingVertical: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
              },
              styleElement.rowAliCenter,
            ]}
          >
            <Image
              style={[
                sizeIcon.md,
                { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 },
              ]}
              source={require("../../NewIcon/phoneBlack.png")}
            />
            <TextInput
              value={phoneNumber}
              keyboardType={"number-pad"}
              onChangeText={(content) => {
                setphoneNumber(content);
              }}
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                paddingVertical: 0,
                flex: 1,
              }}
              placeholder={"Số điện thoại đã đăng kí"}
              placeholderTextColor={"grey"}
            />
          </View>
          <View style={{ height: _moderateScale(8 * 2) }} />

          <View
            style={[
              {
                width: "100%",
                backgroundColor: Color.BG_GREY_OPACITY_2,
                paddingVertical: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
              },
              styleElement.rowAliCenter,
            ]}
          >
            <Image
              style={[
                sizeIcon.md,
                { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 },
              ]}
              source={require("../../NewIcon/lockBlack.png")}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(content) => {
                setPassword(content);
              }}
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                paddingVertical: 0,
                flex: 1,
              }}
              placeholder={"Nhập mật khẩu"}
              placeholderTextColor={"grey"}
            />
          </View>
          <View style={{ height: _moderateScale(8 * 4) }} />

          <TouchableOpacity
            onPress={() => {
              fetchData();
            }}
            style={[
              {
                height: _moderateScale(8 * 6),
                borderRadius: _moderateScale(8),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.SECOND_COLOR,
              },
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.6, 1]}
              colors={[Color.BASE_COLOR, "#8c104e", "#db0505"]}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: _moderateScale(8),
              }}
            />

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
                { fontSize: _moderateScale(14), color: Color.THIRD_COLOR },
              ]}
            >
              Quên mật khẩu
            </Text>
          </TouchableOpacity>
          <View style={{ height: _moderateScale(8 * 2) }} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenKey.REGISTER_IN_APP, {
                routeName: props?.route?.params?.routeName,
              });
            }}
            style={[
              {
                backgroundColor: "transparent",
                height: _moderateScale(8 * 4),
                justifyContent: "center",
                alignItems: "center",
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
                    { fontSize: _moderateScale(14), color: Color.BLUE_FB },
                  ]}
                >
                  Đăng ký ngay
                </Text>
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: _moderateScale(32),
            alignSelf: "center",
          }}
        >
          <Text
            style={[
              stylesFont.fontDinTextPro,
              { color: Color.BLACK, fontSize: _moderateScale(12) },
            ]}
          >
            Copyright © Trang Beauty 2021.
          </Text>
        </View>
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
