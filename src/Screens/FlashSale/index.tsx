import React from "react";
import { Dimensions, StyleSheet, FlatList } from "react-native";
import { TabView } from "react-native-tab-view";
import { MAIN_RED_500, WHITE } from "../../Constant/Color";
import { _moderateScale } from "../../Constant/Scale";
import Screen from "@Components/Screen";
import Header from "./Component/Header";
import Column from "@Components/Column";
import FlashSaleTimes from "./Component/FlashSaleTimes";
import useRecomendServices from "@Screens/NewDetailService/useRecomendServices";
import FlashSaleItem from "./Component/FlashSaleItem";
import { RenderItemProps } from "@typings/common";
import { Service } from "@typings/serviceGroup";

const FlashSale = (props) => {
  const services = useRecomendServices({ codeGroup: ["MAT"] });

  function renderItem({ item }: RenderItemProps<Service>) {
    return <FlashSaleItem item={item} />;
  }

  return (
    <Screen>
      <Header />
      <FlashSaleTimes />
      <FlatList
        data={services}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 4,
    paddingTop: 8,
  },
});

export default FlashSale;
