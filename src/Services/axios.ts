/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import AsyncStorage from '@react-native-community/async-storage';
import axios, {AxiosInstance} from 'axios';

function setupAxios(axios: AxiosInstance) {
  axios.interceptors.request.use(
    async (config) => {
      const accessToken = await AsyncStorage.getItem('token');
      // @ts-ignore
      config.headers = {
        ...config.headers,
      };
      if (
        !config.headers.Authorization ||
        typeof config.headers.Authorization !== 'string'
      ) {
        if (accessToken) {
          config.headers.token = accessToken;
        }
      }

      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
}

const axiosInstances: {[key: string]: AxiosInstance} = {};

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
