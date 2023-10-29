import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Banner from "./Components/Banner";
import Search from "./Components/Search";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import { useState } from "react";
import SoYoung_Service from "../SoYoung_Service/index";
import SoYoung_Branch from "../SoYoung_Branch/index";
import So_Young_Doctor from "../SoYoung_Doctor/index";
import So_Young_Expert from "../SoYoung_Expert";
import { useRef } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getAllServiceGroup } from "../../Redux/Action/ServiceGroup";
import { useDispatch, useSelector } from "react-redux";
import Screen from "../../Components/Screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SoyoungHome = () => {
  const dispatch = useDispatch();
  const scrollableTabViewRef = useRef();
  const [rootTime, setRootTime] = useState(Date.now());
  const { top } = useSafeAreaInsets();

  const listServiceGroupRedux = useSelector(
    (state) => state.serviceGroupReducer?.listServiceGroup
  );

  const heightExpandServiceGr = useSharedValue(0);

  const [expandServiceGr, setExpandServiceGr] = useState(true);

  const [stacks, setStacks] = useState([
    {
      screen: SoYoung_Service,
      tabLabel: "Dịch vụ",
    },
    {
      screen: SoYoung_Branch,
      tabLabel: "Phòng khám",
    },
    {
      screen: So_Young_Doctor,
      tabLabel: "Bác sĩ",
    },
    {
      screen: So_Young_Expert,
      tabLabel: "Chuyên viên",
    },
    {
      screen: SoYoung_Service,
      tabLabel: "Vật liệu",
    },
  ]);

  useEffect(() => {
    _getDataServiceGr();
  }, []);

  const _getDataServiceGr = () => {
    var condition = {
      condition: {
        parentCode: {
          equal: null,
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };
    dispatch(getAllServiceGroup(condition));
  };

  const _renderHeader = () => {
    return <Banner />;
  };

  useEffect(() => {
    if (expandServiceGr) {
      heightExpandServiceGr.value = withTiming(200, { duration: 300 });
    } else {
      heightExpandServiceGr.value = withTiming(0, { duration: 0 });
    }
  }, [expandServiceGr]);

  return (
    <Screen style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: top + 8,
          zIndex: 1,
          alignItems: "center",
          width: _width,
        }}
      >
        <Search
          press={() => {
            setExpandServiceGr((old) => !old);
          }}
        />
      </View>

      <ScrollableTabView
        title={<View />}
        titleArgs={{
          interpolateHeight: {
            inputRange: [0, 160 + top],
            outputRange: [0, 60 + top],
            extrapolate: "clamp",
          },
        }}
        onTabviewChanged={(index, tabLabel) => {}}
        mappingProps={{
          rootTime: rootTime,
        }}
        stacks={stacks}
        tabWrapStyle={{ flex: 1 }}
        tabInnerStyle={{ width: "100%" }}
        tabActiveOpacity={1}
        tabsStyle={styles.tabsStyle}
        tabStyle={styles.tabStyle}
        tabUnderlineStyle={styles.tabUnderlineStyle}
        textStyle={styles.textStyle}
        ref={(it) => (scrollableTabViewRef.current = it)}
        textActiveStyle={{
          color: "#4BA888",
          fontWeight: "bold",
        }}
        header={_renderHeader}
        firstIndex={0}
        useScroll={true}
        toTabsOnTab={true}
        oneTabHidden={true}
        enableCachePage={true}
        tabsEnableAnimatedUnderlineWidth={40}
        tabsEnableAnimated={true}
      />
    </Screen>
  );
};

export default SoyoungHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabsStyle: {
    height: 8 * 5,
    backgroundColor: "white",
    borderBottomColor: "grey",
    // borderBottomWidth: 1,
  },
  tabStyle: {
    backgroundColor: "white",
    width: _width / 4.25,
  },
  textStyle: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
  },
  tabUnderlineStyle: {
    backgroundColor: "#4BA888",
    top: 8 * 4,
    height: 3,
  },
});
