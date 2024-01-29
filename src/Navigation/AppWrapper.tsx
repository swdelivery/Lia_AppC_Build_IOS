import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { navigationRef, getCurrentRoute } from "../../rootNavigation";
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import ModalRequireLogin from "../Components/Notification/ModalRequireLogin";
import ActionSheetIcon from "@Components/ModalBottom/ActionSheetIcon";
import RootNavigator from "./RootNavigator";
import Toast from "react-native-toast-message";
import toastConfig from "@Components/BottomToast";
import RightNoti from "@Components/RightNoti/RightNoti";
import configs from "src/configs";
import Text from "@Components/Text";
import ModalThanks from "@Components/Modal/ModalThanks";
import useInitialization from "src/Hooks/useInitialization";
import useNotifications from "src/Hooks/useNotifications";
import AppUpdateDialog from "@Components/AppUpdateDialog";

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

  useInitialization();
  useNotifications();

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
        <AppUpdateDialog />
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
