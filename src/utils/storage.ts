import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const getString = (key: string) => storage.getString(key);

const setString = (key: string, value: string) => storage.set(key, value);

const getBool = (key: string, defaultValue = false) => {
  const result = storage.getBoolean(key);
  if (result !== undefined && result !== null) {
    return result;
  }
  return defaultValue;
};

const setBool = (key: string, value: boolean) => storage.set(key, value);

const getMap = (key: string) => {
  ``;
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};

const setMap = (key: string, value: object) =>
  storage.set(key, JSON.stringify(value));

const getArray = (key: string) => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};

const setArray = (key: string, values: any[]) =>
  storage.set(key, JSON.stringify(values));

const removeItem = (key: string) => storage.delete(key);

export default {
  getString,
  setString,
  getBool,
  setBool,
  getMap,
  setMap,
  getArray,
  setArray,
  removeItem,

  instance: storage,
};
