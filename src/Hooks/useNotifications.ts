import { useCallback, useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import ScreenKey from "@Navigation/ScreenKey";
import { navigation } from "rootNavigation";

export default function useNotifications() {
  useEffect(() => {
    const onMessageUnsubscribe = messaging().onMessage(
      async (remoteMessage) => {
        const { notification, data } = remoteMessage;

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: "default",
          name: "Default Channel",
          sound: "default",
          vibration: true,
        });

        await notifee.displayNotification({
          id: data?.bookingId + "",
          title: notification?.title ?? "LiA",
          body: notification?.body,
          data,
          android: {
            vibrationPattern: [300, 500],
            sound: "default",
            importance: AndroidImportance.HIGH,
            channelId,
            pressAction: {
              id: "default",
            },
          },
        });
      }
    );

    const onForegroundEventUnsubscribe = notifee.onForegroundEvent(
      ({ type, detail }) => {
        switch (type) {
          case EventType.PRESS:
            // console.log('User pressed notification', detail);
            _handleNavigate(detail?.notification?.data);
            break;
        }
      }
    );

    const onNotificationOpenedUnsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        // console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:', remoteMessage)
        console.log({ remoteMessage });

        if (remoteMessage) {
          setTimeout(() => {
            _handleNavigate(remoteMessage?.data);
          }, 300);
        }
      }
    );

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:', remoteMessage)
        if (remoteMessage) {
          setTimeout(() => {
            _handleNavigate(remoteMessage?.data);
          }, 500);
        }
      });

    return () => {
      onMessageUnsubscribe();
      onNotificationOpenedUnsubscribe();
      onForegroundEventUnsubscribe();
    };
  }, []);

  const _handleNavigate = useCallback((data) => {
    const { event } = data;

    switch (event) {
      case "NEW_PARTNER_MESSAGE":
        return navigation.navigate(ScreenKey.TAB_CHAT);
      case "ADD_BOOKING":
      case "WAS_CONSULTED_BOOKING":
        return navigation.navigate(ScreenKey.LIST_EXAMINATION_RESULTS);
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
  }, []);
}
