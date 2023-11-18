import Header from "@Components/NewHeader/Header";
import Screen from "@Components/Screen";
import { _moderateScale } from "@Constant/Scale";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ItemBeautyInsurance from "./Components/ItemBeautyInsurance";
import useListFilter from "src/Hooks/useListFilter";
import { getInsuranceListState } from "@Redux/insurance/selectors";
import {
  getInsuranceList,
  loadMoreInsuranceList,
} from "@Redux/insurance/actions";

const ListBeautyInsurance = () => {
  const { data, getData } = useListFilter(
    getInsuranceListState,
    getInsuranceList,
    loadMoreInsuranceList
  );

  useEffect(() => {
    getData();
  }, []);

  const _renderItem = () => {
    return <ItemBeautyInsurance />;
  };

  return (
    <Screen>
      <Header title={"Danh sách bảo hiểm"} />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={_renderItem}
        keyExtractor={({ item, index }) => item?._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </Screen>
  );
};

export default ListBeautyInsurance;
