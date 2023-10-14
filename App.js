
if (!__DEV__) {
  console.log = () => { };
}

import { TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Alert, BackHandler, Linking, StatusBar } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import * as DeviceInfo from 'react-native-device-info';
import { Provider } from "react-redux";
import AppWrapper from './src/Navigation/AppWrapper';
import Store from './src/Redux/Store';
import Demo from './src/zDemo/nothing'
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';

console.disableYellowBox = true;



const App = () => {

  const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
  const navigationOptions = {
    headerShown: false,
    ...TransitionPreset,
    gestureResponseDistance: {
      vertical: 800
    }
  }


  return (
    <>
      <Provider store={Store}>
      {/* <StatusBar translucent={true} barStyle={'dark-content'}/> */}
        <AppWrapper />
        {/* <View>
          <Text>awd</Text>
        </View> */}
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})