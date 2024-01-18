import { MMKV } from "react-native-mmkv";

const MMKVwithEncryption = new MMKV({
  id: "lia-token",
  encryptionKey: "Lia@Beauty",
});

const userTokens = {
  accessToken: "",
  refreshToken: "",
};

async function initialize() {
  userTokens.accessToken = MMKVwithEncryption.getString("accessToken") || "";
  userTokens.refreshToken = MMKVwithEncryption.getString("refreshToken") || "";
}

initialize();


async function setTokens(accessToken: string, refreshToken: string) {
  userTokens.accessToken = accessToken;
  userTokens.refreshToken = refreshToken;
  MMKVwithEncryption.set("accessToken", accessToken);
  MMKVwithEncryption.set("refreshToken", refreshToken);
}

function clearTokens() {
  userTokens.accessToken = "";
  userTokens.refreshToken = "";
  MMKVwithEncryption.delete("accessToken");
  MMKVwithEncryption.delete("refreshToken");
}

const getTokens = () => userTokens;

export default {
  setTokens,
  getTokens,
  clearTokens,
};
