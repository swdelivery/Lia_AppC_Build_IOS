import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { Platform, Alert } from "react-native";
import * as DeviceInfo from "react-native-device-info";
import SocketInstance from "../../../SocketInstance";
import { URL_ORIGINAL, URL_FOR_PARTNER } from "../../Constant/Url";
// CALL API
import { handleApi } from "../../Services/utils";
import * as ActionType from "../Constants/ActionType";
import Store from "../store";
import { useLogStyle, setLogStyle } from "./LogConfig";
import isArray from "lodash/isArray";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { alertCustomNotAction } from "../../Constant/Utils";
import keychain from "src/utils/keychain";
import Toast from "react-native-toast-message";

const _checkInfoDevice = async () => {
  let nameDevice = await DeviceInfo.getDeviceName().then((name) => {
    return name;
  });
  let platformDevice = Platform.OS == "ios" ? "IOS" : "ANDROID";
  let versionPlatfromDevice = DeviceInfo.getSystemVersion();
  let macAddressDevice = await DeviceInfo.getMacAddress().then((mac) => {
    return mac;
  });
  console.log({
    nameDevice,
    platformDevice,
    versionPlatfromDevice,
    macAddressDevice,
  });
};

export const firebaseResetPassword = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/firebase-id-token/reset-password`, data)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { firebaseResetPassword: res }
      );
      _checkSuccess(res);
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        firebaseResetPassword: err,
      });
      _checkError(err);
      return err;
      // _checkError(err)
    });
};

export const partnerAccountLogout = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/partner-account/logout`, data)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { partnerAccountLogout: res }
      );
      _checkSuccess(res);
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        partnerAccountLogout: err,
      });
      _checkError(err);
      return err;
      // _checkError(err)
    });
};

export const partnerAccountRegister = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/partner-account/register`, data)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { partnerAccountRegister: res }
      );
      Toast.show({
        text1: "Tạo tài khoản thành công",
        type: "success",
      });
      // _checkSuccess(res)
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        partnerAccountRegister: err,
      });
      _checkError(err);
      return err;
      // _checkError(err)
    });
};

export const forceVerifyAccount = (data) => {
  return Axios.post(
    `${URL_FOR_PARTNER}/partner-account/force-verify-account`,
    data
  )
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { forceVerifyAccount: res }
      );
      // _checkSuccess(res)
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        forceVerifyAccount: err,
      });
      _checkError(err);
      return err;
      // _checkError(err)
    });
};

export const verifyAccount = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/firebase-id-token/verify-account`, data)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { verifyAccount: res }
      );
      // _checkSuccess(res)
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        verifyAccount: err,
      });
      _checkError(err);
      return err;
      // _checkError(err)
    });
};

const createNewTokenFcm = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/partner-device`, data)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { createNewTokenFcm: res }
      );
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        createNewTokenFcm: err,
      });
      // _checkError(err)
    });
};

export const checkRefreshToken = async () => {
  let tokenSTR = keychain.getTokens().accessToken;
  console.log({ tokenSTR });
  if (!tokenSTR) {
    Store.dispatch({
      type: ActionType.CHECK_AUTH_PROCESSING,
      payload: { flag: true },
    });
    return (Axios.defaults.headers.token = null);
  }
  Axios.defaults.headers.token = tokenSTR;

  Axios.get(`${URL_FOR_PARTNER}/partners/profile`, {})
    .then(async (res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getProfile: res }
      );
      let fcmTokenSTR = await AsyncStorage.getItem("fcmToken");
      console.log({ fcmTokenSTR });
      let findTokenFCM = res.data.data.devices.find(
        (itemFind) => itemFind.fcmToken == fcmTokenSTR
      );

      let nameDevice = await DeviceInfo.getDeviceName().then((name) => {
        return name;
      });
      let platformDevice = Platform.OS == "ios" ? "IOS" : "ANDROID";
      let versionPlatfromDevice = DeviceInfo.getSystemVersion();
      let macAddressDevice = await DeviceInfo.getMacAddress().then((mac) => {
        return mac;
      });
      let versionApp = DeviceInfo.getVersion();

      console.log({
        nameDevice,
        fcmTokenSTR,
        platformDevice,
        versionPlatfromDevice,
        macAddressDevice,
        versionApp,
      });

      if (!findTokenFCM) {
        let resultCreateTokenFCM = await createNewTokenFcm({
          fcmToken: fcmTokenSTR,
          name: nameDevice,
          platform: platformDevice,
          versionPlatfrom: versionPlatfromDevice,
          macAddress: macAddressDevice,
          versionApp: versionApp,
        });
      }
      Store.dispatch({
        type: ActionType.SAVE_INFO_USER,
        payload: { data: res.data.data },
      });
      SocketInstance.getInstance();
      Store.dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: { flag: true },
      });
      Store.dispatch({
        type: ActionType.CHECK_AUTH_PROCESSING,
        payload: { flag: true },
      });
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getProfile: err,
      });
      Store.dispatch({
        type: ActionType.CHECK_AUTH_PROCESSING,
        payload: { flag: true },
      });
    });
};

export const login = (props) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.LOADING_BEGIN,
      payload: {
        content: "Đang đăng nhập...",
      },
    });

    Axios.post(`${URL_FOR_PARTNER}/partner-account/login`, props)
      .then(async (res) => {
        keychain.setTokens(res.data.data.token, res.data.data.refreshToken);
        Axios.defaults.headers.token = res.data.data.token;

        await AsyncStorage.setItem("userName", props?.phone?.phoneNumber);
        await AsyncStorage.setItem("password", props?.password);

        Axios.get(`${URL_FOR_PARTNER}/partners/profile`)
          .then(async (res) => {
            console.log(
              useLogStyle + "----FETCHING SUCCESS: ",
              setLogStyle("green"),
              { getProfile: res }
            );
            console.log({ ...res });

            let fcmTokenSTR = await AsyncStorage.getItem("fcmToken");

            console.log({ fcmTokenSTR });

            let findTokenFCM = res.data.data.devices.find(
              (itemFind) => itemFind.fcmToken == fcmTokenSTR
            );

            let nameDevice = await DeviceInfo.getDeviceName().then((name) => {
              return name;
            });
            let platformDevice = Platform.OS == "ios" ? "IOS" : "ANDROID";
            let versionPlatfromDevice = DeviceInfo.getSystemVersion();
            let macAddressDevice = await DeviceInfo.getMacAddress().then(
              (mac) => {
                return mac;
              }
            );

            if (!findTokenFCM) {
              let resultCreateTokenFCM = await createNewTokenFcm({
                fcmToken: fcmTokenSTR,
                name: nameDevice,
                platform: platformDevice,
                versionPlatfrom: versionPlatfromDevice,
                macAddress: macAddressDevice,
              });
              // if (resultCreateTokenFCM?.error?.isAxiosError) return
            }
            dispatch({
              type: ActionType.SAVE_INFO_USER,
              payload: { data: res.data.data },
            });
            dispatch({ type: ActionType.LOADING_DONE, payload: null });
            Toast.show({
              text1: "Đăng nhập thành công",
              type: "success",
            });
            SocketInstance.getInstance();
            dispatch({
              type: ActionType.LOGIN_SUCCESS,
              payload: { flag: true },
            });
          })
          .catch((err) => {
            console.log(
              useLogStyle + "----FETCHING FAIL: ",
              setLogStyle("red"),
              { getProfile: err }
            );
            dispatch({ type: ActionType.LOADING_DONE, payload: null });
          });
      })
      .catch((err) => {
        dispatch({ type: ActionType.LOADING_DONE, payload: null });
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          login: err,
        });

        if (err?.response?.data?.message == "Tài khoản chưa xác nhận") {
          let newFormatPhone = props?.phone?.phoneNumber;

          if (newFormatPhone.charAt(0) == "0") {
            newFormatPhone = `+84${newFormatPhone.substring(1)}`;
          } else {
            newFormatPhone = `+84${newFormatPhone}`;
          }

          return navigation.navigate(ScreenKey.ACTIVATION, {
            phoneNumber: newFormatPhone,
            fullPhone: props?.phone?.phoneNumber,
            password: props?.password,
          });
        }
        if (err?.message == "Network Error") {
          return Toast.show({
            text1: "Không có kết nối mạng",
            type: "error",
          });
        }
        if (err?.response?.data?.message) {
          if (err?.response?.data?.data?.modules) {
            if (isArray(err?.response?.data?.data?.actions)) {
              return Toast.show({
                text1: `${err?.response?.data?.message} {${
                  err?.response?.data?.data?.modules
                }- ${err?.response?.data?.data?.actions?.map((item) => item)}}`,
                type: "error",
              });
            }

            return Toast.show({
              text1: `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
              type: "error",
            });
          }

          return Toast.show({
            text1: `${err?.response?.data?.message}`,
            type: "error",
          });
        }
      });
  };
};

export const loginInApp = (props, routeNameForGoback) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.LOADING_BEGIN,
      payload: {
        content: "Đang đăng nhập...",
      },
    });

    Axios.post(`${URL_FOR_PARTNER}/partner-account/login`, props)
      .then(async (res) => {
        keychain.setTokens(res.data.data.token, res.data.data.refreshToken);
        Axios.defaults.headers.token = res.data.data.token;

        await AsyncStorage.setItem("userName", props?.phone?.phoneNumber);
        await AsyncStorage.setItem("password", props?.password);

        Axios.get(`${URL_FOR_PARTNER}/partners/profile`)
          .then(async (res) => {
            let fcmTokenSTR = await AsyncStorage.getItem("fcmToken");
            console.log({ fcmTokenSTR });

            let findTokenFCM = res.data.data.devices.find(
              (itemFind) => itemFind.fcmToken == fcmTokenSTR
            );

            let nameDevice = await DeviceInfo.getDeviceName().then((name) => {
              return name;
            });
            let platformDevice = Platform.OS == "ios" ? "IOS" : "ANDROID";
            let versionPlatfromDevice = DeviceInfo.getSystemVersion();
            let macAddressDevice = await DeviceInfo.getMacAddress().then(
              (mac) => {
                return mac;
              }
            );
            let versionApp = DeviceInfo.getVersion();

            if (!findTokenFCM) {
              let resultCreateTokenFCM = await createNewTokenFcm({
                fcmToken: fcmTokenSTR,
                name: nameDevice,
                platform: platformDevice,
                versionPlatfrom: versionPlatfromDevice,
                macAddress: macAddressDevice,
                versionApp: versionApp,
              });
              // if (resultCreateTokenFCM?.error?.isAxiosError) return
            }
            dispatch({
              type: ActionType.SAVE_INFO_USER,
              payload: { data: res.data.data },
            });
            dispatch({ type: ActionType.LOADING_DONE, payload: null });
            SocketInstance.getInstance();
            // dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { flag: true } })
            // alertCustomNotAction(`Thông báo`, `Đăng nhập thành công`);
            Toast.show({
              text1: "Đăng nhập thành công",
              type: "success",
            });
            if (routeNameForGoback) {
              navigation.navigate(routeNameForGoback);
            } else {
              navigation.goBack();
            }
          })
          .catch((err) => {
            console.log(
              useLogStyle + "----FETCHING FAIL: ",
              setLogStyle("red"),
              { getProfile: err }
            );
            dispatch({ type: ActionType.LOADING_DONE, payload: null });
          });
      })
      .catch((err) => {
        dispatch({ type: ActionType.LOADING_DONE, payload: null });
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          login: err,
        });

        if (err?.response?.data?.message == "Tài khoản chưa xác nhận") {
          let newFormatPhone = props?.phone?.phoneNumber;

          if (newFormatPhone.charAt(0) == "0") {
            newFormatPhone = `+84${newFormatPhone.substring(1)}`;
          } else {
            newFormatPhone = `+84${newFormatPhone}`;
          }
          console.log({
            phoneNumber: newFormatPhone,
            fullPhone: props?.phone?.phoneNumber,
            password: props?.password,
            routeName: routeNameForGoback,
          });

          return navigation.navigate(ScreenKey.ACTIVATION_IN_APP, {
            phoneNumber: newFormatPhone,
            fullPhone: props?.phone?.phoneNumber,
            password: props?.password,
            routeName: routeNameForGoback,
          });
        }
        if (err?.message == "Network Error") {
          return Toast.show({
            text1: "Không có kết nối mạng",
            type: "error",
          });
        }
        if (err?.response?.data?.message) {
          if (err?.response?.data?.data?.modules) {
            if (isArray(err?.response?.data?.data?.actions)) {
              return Toast.show({
                text1: `${err?.response?.data?.message} {${
                  err?.response?.data?.data?.modules
                }- ${err?.response?.data?.data?.actions?.map((item) => item)}}`,
                type: "error",
              });
            }

            return Toast.show({
              text1: `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
              type: "error",
            });
          }

          return Toast.show({
            text1: `${err?.response?.data?.message}`,
            type: "error",
          });
        }
      });
  };
};

export const register = (data) => {
  return Axios.post(`${URL_FOR_PARTNER}/partner-account/register`, data)
    .then((res) => {
      console.log({ ...res });
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { register: res }
      );

      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        register: err,
      });
      _checkError(err);
    });
};

const _checkError = (err) => {
  if (err?.message == "Network Error") {
    return Toast.show({
      text1: "Không có kết nối mạng",
      type: "error",
    });
  }
  if (err?.response?.data?.message) {
    if (err?.response?.data?.data?.modules) {
      if (isArray(err?.response?.data?.data?.actions)) {
        return Toast.show({
          text1: `${err?.response?.data?.message} {${
            err?.response?.data?.data?.modules
          }- ${err?.response?.data?.data?.actions?.map((item) => item)}}`,
          type: "error",
        });
      }

      return Toast.show({
        text1: `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
        type: "error",
      });
    }

    return Toast.show({
      text1: `${err?.response?.data?.message}`,
      type: "error",
    });
  }

  return Toast.show({
    text1: `Có lỗi xảy ra, vui lòng thử lại`,
    type: "error",
  });
};

const _checkSuccess = (succ) => {
  // console.log(succ);

  if (succ?.data?.message) {
    return Alert.alert("Thông báo", `${succ?.data?.message}`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
};
