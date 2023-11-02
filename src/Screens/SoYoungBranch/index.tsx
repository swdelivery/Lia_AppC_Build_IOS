import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { _width } from "../../Constant/Scale";
import { RenderItemProps } from "../../typings/common";
import BranchItem from "./components/BranchItem";
import { useFocused } from "src/Hooks/useNavigation";
import useListFilter from "src/Hooks/useListFilter";
import { getBranchListState } from "@Redux/branch/selectors";
import { getBranchList, loadMoreBranchList } from "@Redux/branch/actions";

const SoYoungBranch = memo(() => {
  const { isLoading, data, getData } = useListFilter(
    getBranchListState,
    getBranchList,
    loadMoreBranchList
  );

  useFocused(() => {
    getData();
  });

  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
    />
  );
});

export default SoYoungBranch;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 30,
  },
});
