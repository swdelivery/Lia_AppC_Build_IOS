import BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigationRef, navigation } from "../../rootNavigation";
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import { getListDoctorForPartner } from "../Redux/Action/MembersAction";
import * as ActionType from "../Redux/Constants/ActionType";
import Store from "../Redux/store";
import NotifiRightTab from "../Components/NotifiRight/TabRightNotifi";
import ModalNoti from "../Components/Notification/ModalNoti";
import store from "../Redux/store";
import ModalRequireLogin from "../Components/Notification/ModalRequireLogin";
import { getTreatmentDiaryIncompleteDaily } from "../Redux/Action/Diary";
import AsyncStorage from "@react-native-community/async-storage";
import messaging from "@react-native-firebase/messaging";
import ActionSheetIcon from "@Components/ModalBottom/ActionSheetIcon";
import RootNavigator from "./RootNavigator";
import Toast from "react-native-toast-message";
import toastConfig from "@Components/BottomToast";
import RightNoti from "@Components/RightNoti/RightNoti";

const AppWrapper = (props) => {
  const reduxAuth = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  useEffect(() => {
    if (reduxAuth.isLoggedIn == true) {
      dispatch(
        getListDoctorForPartner({
          limit: 1000,
          sort: {
            orderNumber: -1,
          },
        })
      );

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
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>

      <ModalRequireLogin />
      <ActionSheetIcon />
      <Toast config={toastConfig} position="bottom" bottomOffset={60} />
      <RightNoti />
    </>
  );
};

export default AppWrapper;
