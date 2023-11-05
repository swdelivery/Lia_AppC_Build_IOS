import { Linking, StatusBar } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const open = async (url: string) => {
  if (await InAppBrowser.isAvailable()) {
    StatusBar.setBarStyle("dark-content");
    await InAppBrowser.open(url, {
      modalPresentationStyle: "fullScreen",
      animated: true,
    });
  } else {
    await Linking.openURL(url).catch(console.log);
  }
};

const openMap = async (address: string) => {
  const link = `http://maps.google.com/?daddr=${address}`;
  try {
    const supported = await Linking.canOpenURL(link);
    if (supported) Linking.openURL(link);
  } catch (error) {
    console.log(error);
  }
};

export default {
  open,
  openMap,
};
