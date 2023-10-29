import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import Home from "../../../Screens/Soyoung_Home/index";
import SearchingHome from "../../../Screens/NewSearchHome/index";
import ScreenKey from "../../ScreenKey";
import ListBranch from "../../../Screens/ListBranch";
import ListDoctorIOS from "../../../Screens/ListDoctor/index copy";
import ListDoctor from "../../../Screens/ListDoctor/index";
import ListService from "../../../Screens/ListService/index";
import ListAllNews from "../../../Screens/Home/ListAllNews";
import ListProduct from "../../../Screens/ListProduct/index";
import ListAllEncyclopedia from "../../../Screens/Home/ListAllEncyclopedia";

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_BRANCH}
        component={ListBranch}
      />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.SEARCHING_HOME}
        component={SearchingHome}
      />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_DOCTOR}
        component={ListDoctor}
      />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_DOCTOR_IOS}
        component={ListDoctorIOS}
      />
      {/* <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_SERVICE} component={ListService} /> */}
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_PRODUCT}
        component={ListProduct}
      />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_ALL_NEWS}
        component={ListAllNews}
      />
      <Stack.Screen
        options={{ ...TransitionPresets.SlideFromRightIOS }}
        name={ScreenKey.LIST_ALL_ENCYCLOPEDIA}
        component={ListAllEncyclopedia}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
