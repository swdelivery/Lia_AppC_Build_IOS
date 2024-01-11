import Screen from "@Components/Screen";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigationParams } from "src/Hooks/useNavigation";
import MainInfo from "./Components/MainInfo";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import { _width } from "@Constant/Scale";
import { FONT_WEIGHTS } from "@Components/Text";
import Parameter from "./Parameter";
import Introduce from "./Introduce";
import Instruct from "./Instruct";
import { isAndroid } from "src/utils/platform";
import LiAHeader from "@Components/Header/LiAHeader";
import { StatusBar } from "@Components/StatusBar";
import ScreenKey from "@Navigation/ScreenKey";
import HorizontalListImage from "./Components/HorizontalListImage";
import { BASE_COLOR } from "@Constant/Color";
import useApi from "src/Hooks/services/useApi";
import ProductService from "src/Services/ProductService";
import { LoadingView } from "@Components/Loading/LoadingView";

type ScreenKey = typeof ScreenKey.DETAIL_SERVICE_PRODUCT;

const DetailServiceProduct = (props) => {
  const { item } = useNavigationParams<ScreenKey>();
  const { isLoading, data, performRequest } = useApi(
    ProductService.getProductDetails,
    item
  );

  useEffect(() => {
    performRequest(item._id);
  }, [item._id]);

  const Banner = () => {
    return (
      <>
        <HorizontalListImage images={data.representationFileArr} />
        <MainInfo product={data} />
      </>
    );
  };

  const STACKS = [
    {
      screen: () => {
        return isLoading ? <LoadingView /> : <Parameter product={data} />;
      },
      tabLabel: "Thông số",
    },
    {
      screen: () => {
        return <Introduce product={data} />;
      },
      tabLabel: "Giới thiệu",
    },
    {
      screen: () => {
        return <Instruct product={data} />;
      },
      tabLabel: "Hướng dẫn",
    },
  ];

  return (
    <Screen safeBottom={isAndroid}>
      <StatusBar barStyle={"light-content"} />
      <LiAHeader safeTop title={"Thông tin sản phẩm"} />
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

export default DetailServiceProduct;

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
