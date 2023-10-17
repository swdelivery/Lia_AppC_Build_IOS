import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
// import Home from '../../../Screens/Home/index copy';
import Home from '../../../Screens/Soyoung_Home/index'
// import SearchingHome from '../../../Screens/SearchingHome'
import SearchingHome from '../../../Screens/NewSearchHome/index'
import ScreenKey from '../../../Navigation/ScreenKey';
import ListBranch from '../../../Screens/ListBranch';
import ListDoctorIOS from '../../../Screens/ListDoctor/index copy'
import ListDoctor from '../../../Screens/ListDoctor/index'
import ListService from "../../../Screens/ListService/index";
import ListAllNews from '../../../Screens/Home/ListAllNews';
import ListProduct from '../../../Screens/ListProduct/index';
import ListAllEncyclopedia from '../../../Screens/Home/ListAllEncyclopedia';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();



const HomeTab = () => {
    return (
        <Stack.Navigator screenOptions={{  headerShown: false, ...TransitionPresets.SlideFromRightIOS, gestureResponseDistance: { vertical: 800 } }}>
            <Stack.Screen name="Home" component={Home} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_BRANCH} component={ListBranch} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.SEARCHING_HOME} component={SearchingHome} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_DOCTOR} component={ListDoctor} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_DOCTOR_IOS} component={ListDoctorIOS} />
            {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_SERVICE} component={ListService} /> */}
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_PRODUCT} component={ListProduct} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_ALL_NEWS} component={ListAllNews} />
            <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_ALL_ENCYCLOPEDIA} component={ListAllEncyclopedia} />
        </Stack.Navigator>
    )
}

export default HomeTab 