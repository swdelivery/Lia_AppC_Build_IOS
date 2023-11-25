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

const AppWrapper = (props) => {
  const reduxAuth = useSelector((state) => state.authReducer);
  const infoUserRedux = useSelector((state) => state.infoUserReducer);
  const currChattingRedux = useSelector(
    (state) => state.messageReducer.currChatting
  );
  const showListAllNoti = useSelector(
    (state) => state.notificationReducer.showListAllNoti
  );
  const showModalNoti = useSelector(
    (state) => state.notificationReducer.showModalNoti
  );

  const dispatch = useDispatch();

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  // useEffect(() => {

  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });

  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //         console.log(
  //             'Notification caused app to open from background state:',
  //             remoteMessage,
  //         );
  //         if (remoteMessage?.data?.event == "NEW_MESSAGE") {
  //             navigation.navigate(ScreenKey.TAB_CHAT)
  //         }
  //         // navigation.navigate(remoteMessage.data.type);
  //     });

  //     // Check whether an initial notification is available
  //     messaging()
  //         .getInitialNotification()
  //         .then(remoteMessage => {
  //             if (remoteMessage) {
  //                 console.log(
  //                     'Notification caused app to open from quit state:',
  //                     remoteMessage.notification,
  //                 );
  //                 if (remoteMessage?.data?.event == "NEW_MESSAGE") {
  //                     navigation.navigate(ScreenKey.TAB_CHAT)
  //                 }
  //             }
  //             //   setLoading(false);
  //         });

  //     return unsubscribe;

  // }, [])

  // useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //     dynamicLinks().getInitialLink().then((result) => {
  //         if (result) {
  //             handleDynamicLink(result);
  //         } else {
  //             Linking.getInitialURL()
  //                 .then((initialUrl) => {
  //                     if (initialUrl) {

  //                         dynamicLinks().resolveLink(initialUrl)
  //                             .then((resolvedLink) => {
  //                                 handleDynamicLink(resolvedLink);
  //                             })
  //                             .catch(() => {
  //                             });
  //                     }
  //                 })
  //                 .catch(() => {
  //                 });
  //         }
  //     }).catch(() => {
  //     });

  //     return () => {
  //         unsubscribe();
  //     };
  // }, []);

  const handleDynamicLink = async ({ url }) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;

    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    if (params?.idService) {
      navigation.navigate(ScreenKey.DETAIL_SERVICE, {
        idService: params?.idService,
      });

      if (params?.codeAffiliate) {
        let data = {
          idService: params?.idService,
          codeAffiliate: params?.codeAffiliate,
        };
        await AsyncStorage.setItem(
          "codeAffiliateVsIdService",
          JSON.stringify(data)
        );
        // store.dispatch({
        //     type: ActionType.SET_CODE_AFFILIATE,
        //     payload: {
        //         data: params?.codeAffiliate
        //     }
        // })
      }
    }
  };

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

  useEffect(() => {
    if (reduxAuth.checkAuthProcessing == true) {
      // RNBootSplash.hide({ fade: true });
      // SplashScreen.hide();
    }
  }, [reduxAuth.checkAuthProcessing]);

  useEffect(() => {
    if (infoUserRedux?.infoUser?._id) {
      if (
        infoUserRedux?.infoUser?.fileAvatar?.defaultType == "DEFAULT_AVATAR"
      ) {
        store.dispatch({
          type: ActionType.SHOW_MODAL_REQUIRE_AVATAR,
          payload: {
            flag: true,
          },
        });
      }

      _getTreatmentDiaryIncompleteDaily();
    }
  }, [infoUserRedux]);

  const _getTreatmentDiaryIncompleteDaily = async () => {
    let result = await getTreatmentDiaryIncompleteDaily();
    if (result?.isAxiosError) return;

    if (result?.data?.data?.length > 0) {
      Store.dispatch({
        type: ActionType.SHOW_BAGED_DIARY,
        payload: {
          data: true,
        },
      });
      Store.dispatch({
        type: ActionType.SET_DATA_BAGED_DIARY,
        payload: {
          data: result?.data?.data,
        },
      });
    }
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
      {reduxAuth.isLoggedIn == true && infoUserRedux?.infoUser?._id ? (
        <NotifiRightTab showTabRightNotifi={showListAllNoti} />
      ) : (
        <></>
      )}

      {reduxAuth.isLoggedIn == true && infoUserRedux?.infoUser?._id ? (
        <ModalNoti showModalNoti={showModalNoti} />
      ) : (
        <></>
      )}

      <ModalRequireLogin />
      <ActionSheetIcon />
      <Toast config={toastConfig} position="bottom" bottomOffset={60} />
    </>
  );
};

export default AppWrapper;
