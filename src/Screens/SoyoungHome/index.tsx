import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
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
import { useSharedValue, withTiming } from "react-native-reanimated";
import Screen from "../../Components/Screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styleElement } from "../../Constant/StyleElement";
import { FONT_WEIGHTS } from "@Components/Text";
import SoYoungMaterial from "@Screens/SoYoungMaterial";
import SoYoungPractitioner from "@Screens/SoYoungPractitioner";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import { FocusAwareStatusBar } from "@Components/StatusBar";
import { useIsFocused } from "@react-navigation/native";
import { BASE_COLOR } from "@Constant/Color";

const STACKS = [
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
    screen: SoYoungPractitioner,
    tabLabel: "Chuyên viên",
  },
  {
    screen: SoYoungMaterial,
    tabLabel: "Vật liệu",
  },
];

const SoyoungHome = () => {
  const { top } = useSafeAreaInsets();
  const heightExpandServiceGr = useSharedValue(0);
  const [expandServiceGr, setExpandServiceGr] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (expandServiceGr) {
      heightExpandServiceGr.value = withTiming(200, { duration: 300 });
    } else {
      heightExpandServiceGr.value = withTiming(0, { duration: 0 });
    }
  }, [expandServiceGr]);

  const handleTabViewChnaged = useCallback((index, tabLabel) => {
    setTabIndex(index);
  }, []);

  return (
    <Screen style={styles.container}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={"transparent"}
        translucent
      />
      <View style={styles.searchContainer}>
        <Search
          press={() => {
            setExpandServiceGr((old) => !old);
          }}
        />
      </View>
      <AfterTimeoutFragment>
        <ScrollableTabView
          title={<View />}
          titleArgs={{
            interpolateHeight: {
              inputRange: [0, 160 + top],
              outputRange: [0, 65 + top],
              extrapolate: "clamp",
            },
          }}
          stacks={STACKS}
          onTabviewChanged={handleTabViewChnaged}
          mappingProps={{
            tabIndex,
            isFocused,
          }}
          tabWrapStyle={styleElement.flex}
          tabInnerStyle={styles.tabInnerStyle}
          tabActiveOpacity={1}
          tabsStyle={styles.tabsStyle}
          tabStyle={styles.tabStyle}
          tabUnderlineStyle={styles.tabUnderlineStyle}
          textStyle={styles.textStyle}
          textActiveStyle={styles.textActiveStyle}
          header={<Banner />}
          firstIndex={0}
          useScroll={true}
          toTabsOnTab={true}
          oneTabHidden={true}
          enableCachePage={true}
          tabsEnableAnimatedUnderlineWidth={40}
          tabsEnableAnimated={true}
        />
      </AfterTimeoutFragment>
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
    fontWeight: Platform.OS === "ios" ? "bold" : undefined,
    fontSize: 14,
    fontFamily: FONT_WEIGHTS["bold"],
  },
  tabUnderlineStyle: {
    backgroundColor: BASE_COLOR,
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
  textActiveStyle: {
    color: BASE_COLOR,
    fontWeight: Platform.OS === "ios" ? "bold" : undefined,
  },
});
