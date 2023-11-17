/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { CLEAR_INFO_USER } from "@Redux/Constants/ActionType";
import store from "@Redux/store";
import SocketInstance from "SocketInstance";
import axios, { AxiosInstance } from "axios";
import { navigation } from "rootNavigation";
import keychain from "src/utils/keychain";

let tokens = keychain.getTokens();

const setupAxios = (instance: AxiosInstance) => {
  const refreshToken = (originalRequest: any) => {
    return instance
      .post("/partner-account/refresh-token", {
        refreshToken: tokens.refreshToken,
      })
      .then((res) => {
        if (res.status === 200) {
          // 1) put token to LocalStorage
          const { token, refreshToken: newRefreshToken } = res.data.data;
          keychain.setTokens(token, newRefreshToken);

          // 2) Change Authorization header
          axios.defaults.headers.common.Authorization = token;
        }
        // 3) return originalRequest object with Axios.
        return axios(originalRequest);
      });
  };

  instance.interceptors.request.use(async (config) => {
    const accessToken = keychain.getTokens().accessToken;
    // @ts-ignore
    config.headers = {
      ...config.headers,
    };
    if (
      !config.headers.Authorization ||
      typeof config.headers.Authorization !== "string"
    ) {
      if (accessToken) {
        config.headers.token = accessToken;
      }
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  // Add a response interceptor
  instance.interceptors.response.use(
    (res) => res,
    ({ response, message, config }) => {
      const originalRequest: any = config;
      if (
        response.status === 401 &&
        !originalRequest.__retry &&
        !!tokens.refreshToken
      ) {
        originalRequest.__retry = true;
        return refreshToken(originalRequest);
      }

      if (response.status === 401) {
        keychain.clearTokens();
        store.dispatch({
          type: CLEAR_INFO_USER,
        });
        // @ts-ignore
        navigation.navigate("MainTab");
        SocketInstance.instance = null;
        SocketInstance?.socketConn?.disconnect();
        SocketInstance.socketConn = null;
      }
      throw new Error(message);
    }
  );
};

const axiosInstances: { [key: string]: AxiosInstance } = {};

export default function createAxios(url: string) {
  if (axiosInstances[url]) {
    return axiosInstances[url];
  }
  const instance: AxiosInstance = axios.create({
    baseURL: url,
  });
  setupAxios(instance);
  axiosInstances[url] = instance;
  return instance;
}
