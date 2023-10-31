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
import SoYoungService from "../SoYoungService/index";
import SoYoungBranch from "../SoYoungBranch/index";
import SoYoungDoctor from "../SoYoungDoctor/index";
import SoYoungExpert from "../SoYoungExpert";
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
import { styleElement } from "../../Constant/StyleElement";

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
      screen: SoYoungService,
      tabLabel: "Dịch vụ",
    },
    {
      screen: SoYoungBranch,
      tabLabel: "Phòng khám",
    },
    {
      screen: SoYoungDoctor,
      tabLabel: "Bác sĩ",
    },
    {
      screen: SoYoungExpert,
      tabLabel: "Chuyên viên",
    },
    {
      screen: SoYoungService,
      tabLabel: "Vật liệu",
    },
  ]);

  useEffect(() => {
    if (expandServiceGr) {
      heightExpandServiceGr.value = withTiming(200, { duration: 300 });
    } else {
      heightExpandServiceGr.value = withTiming(0, { duration: 0 });
    }
  }, [expandServiceGr]);

  return (
    <Screen style={styles.container}>
      <View style={styles.searchContainer}>
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
            outputRange: [0, 55 + top],
            extrapolate: "clamp",
          },
        }}
        mappingProps={{
          rootTime: rootTime,
        }}
        stacks={stacks}
        tabWrapStyle={styleElement.flex}
        tabInnerStyle={styles.tabInnerStyle}
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
        header={<Banner />}
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
  searchContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    width: _width,
  },
  tabInnerStyle: { width: "100%" },
});
