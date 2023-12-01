import Screen from "@Components/Screen";
import { _moderateScale } from "@Constant/Scale";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ItemBeautyInsurance from "./Components/ItemBeautyInsurance";
import useListFilter from "src/Hooks/useListFilter";
import { getInsuranceListState } from "@Redux/insurance/selectors";
import {
  getInsuranceList,
  loadMoreInsuranceList,
} from "@Redux/insurance/actions";
import { RenderItemProps } from "@typings/common";
import { Insurance } from "@typings/insurance";
import useItemExtractor from "src/Hooks/useItemExtractor";
import LiAHeader from "@Components/Header/LiAHeader";

const ListBeautyInsurance = () => {
  const { data, getData } = useListFilter(
    getInsuranceListState,
    getInsuranceList,
    loadMoreInsuranceList
  );

  useEffect(() => {
    getData();
  }, []);

  const _renderItem = ({ item }: RenderItemProps<Insurance>) => {
    return <ItemBeautyInsurance item={item} />;
  };

  const { keyExtractor } = useItemExtractor<Insurance>((item) => item._id);

  return (
    <Screen>
      <LiAHeader
        safeTop
        title={"Danh sách bảo hiểm"}
        barStyle="light-content"
      />
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    </Screen>
  );
};

export default ListBeautyInsurance;

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 100 },
});
