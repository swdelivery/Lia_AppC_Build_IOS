import BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  navigationRef,
  navigation,
  getCurrentRoute,
} from "../../rootNavigation";
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import ModalRequireLogin from "../Components/Notification/ModalRequireLogin";
import messaging from "@react-native-firebase/messaging";
import ActionSheetIcon from "@Components/ModalBottom/ActionSheetIcon";
import RootNavigator from "./RootNavigator";
import Toast from "react-native-toast-message";
import toastConfig from "@Components/BottomToast";
import RightNoti from "@Components/RightNoti/RightNoti";
import configs from "src/configs";
import Text from "@Components/Text";
import ModalThanks from "@Components/Modal/ModalThanks";

const LINKING = {
  prefixes: [`https://${configs.appLinkDomain}`],

  config: {
    screens: {
      [ScreenKey.CHARITY_FUND_DETAILS]: "thien-nguyen/:id",
    },
  },
};

const AppWrapper = (props) => {
  const routeNameRef = useRef<string | null>("");
  const reduxAuth = useSelector((state) => state.authReducer);

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    if (reduxAuth.isLoggedIn == true) {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage
        );
        if (remoteMessage?.data?.event == "NEW_MESSAGE") {
          navigation.navigate(ScreenKey.TAB_CHAT);
        }
        // navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
            if (remoteMessage?.data?.event == "NEW_MESSAGE") {
              setTimeout(() => {
                navigation.navigate(ScreenKey.TAB_CHAT);
              }, 500);
            }
          }
          //   setLoading(false);
        });

      return unsubscribe;
    }
  }, [reduxAuth.isLoggedIn]);

  const handleNavigationStateChange = useCallback((state: any) => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = getCurrentRoute(state);
    if (previousRouteName !== currentRoute?.name) {
      // The line below uses the @react-native-firebase/analytics tracker
      // Change this line to use another Mobile analytics SDK
      // TODO: analytics.setCurrentScreen(currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRoute?.name;
    console.log({
      currentRouteName: currentRoute?.name,
      params: currentRoute.params,
    });
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        linking={LINKING}
        fallback={<Text>Đang tải...</Text>}
        onStateChange={handleNavigationStateChange}
      >
        <RootNavigator />
      </NavigationContainer>

      <ModalRequireLogin />
      <ActionSheetIcon />
      <Toast config={toastConfig} position="bottom" bottomOffset={60} />
      <RightNoti />
      <ModalThanks />
    </>
  );
};

export default AppWrapper;
