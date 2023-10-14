import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import OverViewChatTab from '../../../Screens/Conversation/index';
import ScreenKey from '../../ScreenKey';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();


// import ListMembers from '../../../Screens/Members/index'

const CostTab = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, gestureResponseDistance: { vertical: 800 } }}>

            <Stack.Screen
                name={ScreenKey.CHAT}
                component={OverViewChatTab} />
            {/* <Stack.Screen
                name={ScreenKey.LIST_MEMBER_APP}
                component={ListMembers} /> */}

        </Stack.Navigator>
    )
}

export default CostTab 