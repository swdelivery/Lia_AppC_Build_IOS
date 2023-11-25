import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import OverViewChatTab from '../../../Screens/Conversation/index';
import ScreenKey from '../../ScreenKey';
import NewListLastedMessage from '@Screens/NewListLastedMessage';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();


const ChatTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={ScreenKey.CHAT} component={NewListLastedMessage} />
    </Stack.Navigator>
  );
}

export default ChatTab 
