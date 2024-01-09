import BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigationRef, navigation } from "../../rootNavigation";
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import { getListDoctorForPartner } from "../Redux/Action/MembersAction";
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
  const dispatch = useDispatch();
  const reduxAuth = useSelector((state) => state.authReducer);

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    if (reduxAuth.isLoggedIn == true) {
      // dispatch(
      //   getListDoctorForPartner({
      //     limit: 1000,
      //     sort: {
      //       orderNumber: -1,
      //     },
      //   })
      // );

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

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        linking={LINKING}
        fallback={<Text>Đang tải...</Text>}
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
