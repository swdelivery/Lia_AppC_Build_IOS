import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useSelector } from "react-redux";
import TabbarMessageIcon from "../../Components/TabbarNew/ChatTabIcon";
import TabbarHomeIcon from "../../Components/TabbarNew/HomeTabIcon";
import TabbarTimelineIcon from "../../Components/TabbarNew/NewsTabIcon";
import TabbarProfileIcon from "../../Components/TabbarNew/ProfileTabIcon";
import { BASE_COLOR, BG_GREY_OPACITY_3, GREY } from "../../Constant/Color";
import { _heightScale, _moderateScale, _width } from "../../Constant/Scale";
import ScreenKey from "../ScreenKey";
import store from "../../Redux/store";
import * as ActionType from "../../Redux/Constants/ActionType";
import { getInfoUserReducer } from "../../Redux/Selectors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_WEIGHTS } from "@Components/Text";
import NewListLastedMessage from "@Screens/NewListLastedMessage";
import Home from "@Screens/SoyoungHome";
import NewProfile from "@Screens/NewProfile/NewProfile";
import Social from "@Screens/Social";
import AdsPopup from "@Screens/SoyoungHome/Components/AdsPopup";

const Tab = createMaterialTopTabNavigator();

const MainTab = (props) => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Tab.Navigator
        tabBarPosition="bottom"
        // lazy={true}
        // swipeEnabled={false}
        // tabBarOptions={tabBarOptions}
        screenOptions={{
          lazy: true,
          swipeEnabled: false,
          tabBarActiveTintColor: BASE_COLOR,
          tabBarInactiveTintColor: GREY,
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderColor: BG_GREY_OPACITY_3,
            margin: 0,
            paddingBottom: bottom,
            width: _width,
          },
          tabBarIndicatorStyle: {
            backgroundColor: BASE_COLOR,
            top: 0,
            width: _width / 10,
            left: _width / 10 / 1.25,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: FONT_WEIGHTS["regular"],
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
          component={Home}
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
          component={Social}
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
          component={infoUser?._id ? NewListLastedMessage : () => <></>}
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
          component={infoUser?._id ? NewProfile : () => <></>}
        />
      </Tab.Navigator>
      <AdsPopup />
    </>
  );
};

export default MainTab;
