import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import OverViewProfileTab from '../../../Screens/Profile/Profile';
import ScreenKey from '../../ScreenKey';
import TreatmentRecord from '../../../Screens/TreatmentRecord/index';
import ListDiary from '../../../Screens/ListDiaryOfPartner'
import ListDiaryOfPartnerChild from '../../../Screens/ListDiaryOfPartnerChild'
import PickTreatmentDiary from '../../../Screens/ListDiaryOfPartner/Components/PickTreatmentToDiary'
import ListAllHistoryTreatment from '../../../Screens/Profile/ListAllHistoryTreatment';

import ProfileNew from '../../../Screens/ProfileNew/index'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();



const ProfileTab = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name={ScreenKey.PROFILE} component={OverViewProfileTab} />

        <rootStack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name={ScreenKey.TREATMENT_RECORD}
          component={TreatmentRecord}
        />
        <rootStack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name={ScreenKey.PICK_TREATMENT_TO_BOOKING}
          component={PickTreatmentDiary}
        />
        <rootStack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name={ScreenKey.LIST_PARTNER_DIARY}
          component={ListDiary}
        />
        <rootStack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name={ScreenKey.LIST_PARTNER_DIARY_CHILD}
          component={ListDiaryOfPartnerChild}
        />
      </Stack.Navigator>
    );
}

export default ProfileTab 