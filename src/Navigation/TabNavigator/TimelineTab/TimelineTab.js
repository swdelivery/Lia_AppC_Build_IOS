import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import TimelineTabView from '../../../Screens/NewFeed/index';
import ScreenKey from '../../ScreenKey';
import DetailNewFeed from '../../../Screens/DetailNewFeed'
import MyPersonalPage from '../../../Screens/MyPersonalPage/MyPersonalPage';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();



const TimelineTab = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      >
        <Stack.Screen name={ScreenKey.TIMELINE} component={TimelineTabView} />

        {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.DETAIL_NEW_FEED} component={DetailNewFeed} /> */}
        {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.MY_PERSONAL_PAGE} component={MyPersonalPage} /> */}
      </Stack.Navigator>
    );
}

export default TimelineTab 