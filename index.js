/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import localVI from 'moment/locale/vi';
import React from "react";
import { AppRegistry, LogBox } from "react-native";
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import { checkRefreshToken } from './src/Redux/Action/AuthAction';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

LogBox.ignoreAllLogs()

async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
}

registerAppWithFCM()

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

async function requestUserPermission() {

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {

        // messaging().registerDeviceForRemoteMessages();

        getFcmToken()
        console.log('Authorization status:', authStatus);
    }
}
getFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
        console.log("Your Firebase Token is:", fcmToken);
        AsyncStorage.setItem('fcmToken', fcmToken)
    } else {
        console.log("Failed", "No token received");
    }
}
requestUserPermission()


checkRefreshToken()


moment.locale('vi', localVI);


function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <App />;
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(HeadlessCheck));
