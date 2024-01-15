import { Storage } from "redux-persist";
import storage from "src/utils/storage";

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.setString(key, value);
    console.log("reduxStorage.setItem", key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.removeItem(key);
    console.log("reduxStorage.removeItem", key);
    return Promise.resolve();
  },
};
