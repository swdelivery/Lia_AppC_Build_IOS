import BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { getServiceGroup } from "@Redux/home/actions";
import { getServiceGroupState } from "@Redux/home/selectors";
import { isEmpty } from "lodash";
import { Alert } from "react-native";
import { getServiceListState } from "@Redux/service/selectors";
import { getListNewsState } from "@Redux/news/selectors";
import { getImageVoucherHomeState } from "@Redux/imageVoucher/selectors";
import { getFlashSaleState } from "@Redux/flashSale/selectors";

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
  const dispatch = useDispatch()

  const { isFirstLoaded: isFirstLoadedNews } = useSelector(getListNewsState)
  const { isFirstLoaded: isFirstLoadedServiceGroup } = useSelector(getServiceGroupState);
  const { isFirstLoaded: isFirstLoadedImageVoucher } = useSelector(getImageVoucherHomeState);
  const { isFirstLoaded: isFirstLoadedGetFlashSale } = useSelector(getFlashSaleState);


  useEffect(() => {
    if (
      isFirstLoadedNews &&
      isFirstLoadedServiceGroup &&
      isFirstLoadedImageVoucher &&
      isFirstLoadedGetFlashSale) {
      setTimeout(() => {
        _hideSplashScreen()
      }, 1000);
    }
  }, [
    isFirstLoadedNews,
    isFirstLoadedServiceGroup,
    isFirstLoadedImageVoucher,
    isFirstLoadedGetFlashSale
  ])

  const _hideSplashScreen = useCallback(async () => {
    await BootSplash.hide({ fade: true });
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log({ remoteMessage });

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        vibration: true,
        vibrationPattern: [300, 500],
      });

      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage?.data,
        android: {
          vibrationPattern: [300, 500],
          sound: 'default',
          importance: AndroidImportance.HIGH,
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          // console.log('User pressed notification', detail);
          _handleNavigate(detail?.notification?.data)
          break;
      }
    });

    messaging()
      .onNotificationOpenedApp(remoteMessage => {
        // console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:', remoteMessage)
        if (remoteMessage) {
          setTimeout(() => {
            _handleNavigate(remoteMessage?.data)
          }, 300);
        }
      });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:', remoteMessage)
        if (remoteMessage) {
          setTimeout(() => {
            _handleNavigate(remoteMessage?.data)
          }, 500);
        }
      });

    return unsubscribe;
  }, []);

  const _handleNavigate = useCallback((data) => {
    const { event } = data;

    switch (event) {
      case "NEW_PARTNER_MESSAGE":
        return navigation.navigate(ScreenKey.TAB_CHAT);
      case "ADD_BOOKING":
      case "WAS_CONSULTED_BOOKING":
        return navigation.navigate(ScreenKey.LIST_BOOKING);
      case "TAKE_MEDICINES":
        return navigation.navigate(ScreenKey.LIST_MEDICINE);
      case "PERSONAL_HYGIENE":
      case "UPDATE_POSTOPERATIVE":
        return navigation.navigate(ScreenKey.TAKECARE);
      case "CREATE_POST":
      case "ADD_POST_COMMENT_POST_AUTHOR":
      case "LIKE_POST_AUTHOR":
      case "HANDLED_DELETE_PARTNER_POST_COMMENT":
        return navigation.navigate(ScreenKey.TAB_TIMELINE);
      case "LIA_BONUS":
        return navigation.navigate(ScreenKey.WHEEL_SPIN);

      default:
        break;
    }

  }, [])


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
