import Screen from "@Components/Screen";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFocused } from "src/Hooks/useNavigation";
import HorizontalListImage from "./Components/HorizontalListImage";
import MainInfo from "./Components/MainInfo";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import { _width } from "@Constant/Scale";
import { FONT_WEIGHTS } from "@Components/Text";
import Parameter from "./Parameter";
import Introduce from "./Introduce";
import Instruct from "./Instruct";
import { getDetailMaterial } from "@Redux/Action/Material";
import { isAndroid } from "src/utils/platform";
import LiAHeader from "@Components/Header/LiAHeader";
import { StatusBar } from "@Components/StatusBar";
import { BASE_COLOR } from "@Constant/Color";

const DetailMaterial = (props) => {
  const [infoMaterial, setInfoMaterial] = useState(null);

  useFocused(() => {
    _getData(props?.route?.params?._id);
  });

  const _getData = async (_id) => {
    let result = await getDetailMaterial(_id);
    if (result?.isAxiosError) return;
    setInfoMaterial(result?.data?.data);
  };

  const Banner = () => {
    return (
      <>
        <HorizontalListImage infoMaterial={infoMaterial} />
        <MainInfo infoMaterial={infoMaterial} />
      </>
    );
  };

  const STACKS = [
    {
      screen: () => {
        return <Parameter infoMaterial={infoMaterial} />;
      },
      tabLabel: "Thông số",
    },
    {
      screen: () => {
        return <Introduce infoMaterial={infoMaterial} />;
      },
      tabLabel: "Giới thiệu",
    },
    {
      screen: () => {
        return <Instruct infoMaterial={infoMaterial} />;
      },
      tabLabel: "Hướng dẫn",
    },
  ];

  return (
    <Screen safeBottom={isAndroid}>
      <StatusBar barStyle={"light-content"} />
      <LiAHeader safeTop title={"Thông tin vật liệu"} />

      <ScrollableTabView
        title={<View />}
        titleArgs={{
          interpolateHeight: {
            inputRange: [0, 0],
            outputRange: [0, 0],
            extrapolate: "clamp",
          },
        }}
        stacks={STACKS}
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

export default DetailMaterial;

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
    fontWeight: "bold",
  },
});
