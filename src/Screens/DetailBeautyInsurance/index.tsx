import Header from "@Components/NewHeader/Header";
import Screen from "@Components/Screen";
import { FONT_WEIGHTS } from "@Components/Text";
import { _width } from "@Constant/Scale";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import React, { useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { isAndroid } from "src/utils/platform";
import Benefit from "./Benefit";
import HorizontalListImage from "./Components/HorizontalListImage";
import MainInfo from "./Components/MainInfo";
import InsuranceClaim from "./InsuranceClaim";
import Rules from "./Rules";

const DetailBeautyInsurance = (props) => {

  const scrollableTabViewRef = useRef();
  const [rootTime, setRootTime] = useState(Date.now());

  const Banner = () => {
    return (
      <>
        <HorizontalListImage />
        <MainInfo />
      </>
    );
  };

  const STACKS = [
    {
      screen: () => {
        return <Benefit />;
      },
      tabLabel: "Lợi ích",
    },
    {
      screen: () => {
        return <InsuranceClaim />;
      },
      tabLabel: "Giới thiệu",
    },
    {
      screen: () => {
        return <Rules />;
      },
      tabLabel: "Hướng dẫn",
    },
  ];

  return (
    <Screen safeBottom={isAndroid}>
      <StatusBar barStyle={"light-content"} />
      <Header title={"Bảo hiểm làm đẹp"} />

      <ScrollableTabView
        title={<View />}
        titleArgs={{
          interpolateHeight: {
            inputRange: [0, 0],
            outputRange: [0, 0],
            extrapolate: "clamp",
          },
        }}
        mappingProps={{
          rootTime: rootTime,
        }}
        stacks={STACKS}
        ref={(it) => (scrollableTabViewRef.current = it)}
        header={<Banner />}
        tabsStyle={styles.tabsStyle}
        tabStyle={styles.tabStyle}
        tabsEnableAnimated={true}
        tabInnerStyle={styles.tabInnerStyle}
        tabActiveOpacity={1}
        tabUnderlineStyle={styles.tabUnderlineStyle}
        textStyle={styles.textStyle}
        textActiveStyle={styles.textActiveStyle}
        firstIndex={0}
        toTabsOnTab={true}
        oneTabHidden={true}
        enableCachePage={true}
      />
    </Screen>
  );
};

export default DetailBeautyInsurance;

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
    fontFamily: FONT_WEIGHTS["bold"],
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
  textActiveStyle: {
    color: "#4BA888",
    fontWeight: "bold",
  },

});
