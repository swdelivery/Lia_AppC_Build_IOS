import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { Dimensions, Image, Platform } from "react-native";
import { useSelector } from "react-redux";
import TabbarMessageIcon from "../../Components/TabbarNew/ChatTabIcon";
import TabbarTaskIcon from "../../Components/Tabbar/TaskTabIcon";
import TabbarHomeIcon from "../../Components/TabbarNew/HomeTabIcon";
import TabbarTimelineIcon from "../../Components/TabbarNew/NewsTabIcon";
import TabbarLiveStreamIcon from "../../Components/Tabbar/LiveStreamTabIcon";
import TabbarProfileIcon from "../../Components/TabbarNew/ProfileTabIcon";

import { BASE_COLOR, BG_GREY_OPACITY_3, GREY } from "../../Constant/Color";
import { sizeIcon } from "../../Constant/Icon";
import { _heightScale, _moderateScale, _width } from "../../Constant/Scale";
import ScreenKey from "../ScreenKey";

import HomeTab from "./HomeTab/HomeTab";
import ChatTab from "./ChatTab/ChatTab";
import ProfileTab from "./ProfileTab/ProfileTab";
import TimelineTab from "./TimelineTab/TimelineTab";
import LiveStreamTab from "../../Screens/LiveStream/index";
import { navigation } from "../../../rootNavigation";
import QRTab from "../../Screens/QRCode/index";
import store from "../../Redux/Store";
import * as ActionType from "../../Redux/Constants/ActionType";
import { getInfoUserReducer } from "../../Redux/Selectors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();

const MainTab = (props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      // lazy={true}
      // swipeEnabled={false}
      // tabBarOptions={tabBarOptions}
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: BASE_COLOR,
        tabBarInactiveTintColor: GREY,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderColor: BG_GREY_OPACITY_3,
          margin: 0,
          paddingBottom: bottom,
        },
        tabBarIndicatorStyle: {
          backgroundColor: BASE_COLOR,
          top: 0,
          width: _width / 10,
          left: _width / 10 / 1.25,
        },
        tabBarLabelStyle: {
          fontSize: _moderateScale(12),
          fontFamily:
            Platform.OS == "ios" ? "NolanNext" : "Kastelov-NolanNext-Regular",
          textTransform: "capitalize",
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ focused }) => <TabbarHomeIcon focused={focused} />,
        }}
        name={ScreenKey.HOME}
        component={HomeTab}
      />

      <Tab.Screen
        // listeners={{
        //     tabPress: (e) => {
        //         if (!infoUser?._id) {
        //             store.dispatch({
        //                 type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
        //                 payload: {
        //                     flag: true,
        //                     currRouteName: props?.route?.name
        //                 }
        //             })

        //             // navigation.navigate(ScreenKey?.LOGIN_IN_APP)
        //             e.preventDefault();
        //         }
        //     }
        // }}
        options={{
          title: "Hoạt động",
          tabBarIcon: ({ tintColor, focused }) => (
            // focused ?
            //     <Image style={sizeIcon.lg} source={require('../../Icon/a_trang.png')} />
            //     :
            //     <Image style={sizeIcon.lg} source={require('../../Icon/i_trang.png')} />
            <TabbarTimelineIcon focused={focused} />
          ),
        }}
        name={ScreenKey.TAB_TIMELINE}
        component={TimelineTab}
        // component={infoUser?._id ? TimelineTab : () => <></>}
      />

      {/* <Tab.Screen
                listeners={{
                    tabPress: (e) => {
                        if (!infoUser?._id) {
                            // navigation.navigate(ScreenKey?.LOGIN_IN_APP)
                            store.dispatch({
                                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                payload: {
                                    flag: true,
                                    currRouteName: props?.route?.name
                                }
                            })
                            e.preventDefault();
                        }
                    }
                }}
                options={
                    {
                        title: 'Live Steam',
                        tabBarIcon: ({ tintColor, focused }) => (
                            // focused ?
                            //     <Image style={sizeIcon.lg} source={require('../../Icon/a_trang.png')} />
                            //     :
                            //     <Image style={sizeIcon.lg} source={require('../../Icon/i_trang.png')} />
                            <TabbarLiveStreamIcon focused={focused} />
                        )
                    }
                }
                name={ScreenKey.QR_CODE}
                component={infoUser?._id ? QRTab : () => <></>}
            /> */}

      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            if (!infoUser?._id) {
              // navigation.navigate(ScreenKey?.LOGIN_IN_APP)
              // e.preventDefault();
              store.dispatch({
                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                payload: {
                  flag: true,
                  currRouteName: props?.route?.name,
                },
              });
              e.preventDefault();
            }
          },
        }}
        options={{
          title: "Tin nhắn",
          tabBarIcon: ({ tintColor, focused }) => (
            <TabbarMessageIcon focused={focused} />
          ),
        }}
        name={ScreenKey.TAB_CHAT}
        component={infoUser?._id ? ChatTab : () => <></>}
      />

      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            if (!infoUser?._id) {
              // navigation.navigate(ScreenKey?.LOGIN_IN_APP)
              // e.preventDefault();
              store.dispatch({
                type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                payload: {
                  flag: true,
                  currRouteName: props?.route?.name,
                },
              });
              e.preventDefault();
            }
          },
        }}
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ tintColor, focused }) => (
            <TabbarProfileIcon focused={focused} />
          ),
        }}
        name={ScreenKey.TAB_PROFILE}
        component={infoUser?._id ? ProfileTab : () => <></>}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
