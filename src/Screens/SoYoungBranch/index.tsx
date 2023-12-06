import React, { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import { RenderItemProps } from "../../typings/common";
import BranchItem, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./components/BranchItem";
import useListFilter from "src/Hooks/useListFilter";
import { getBranchListState } from "@Redux/branch/selectors";
import { getBranchList, loadMoreBranchList } from "@Redux/branch/actions";
import { FlatList } from "react-native-gesture-handler";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import ListEmpty from "@Components/ListEmpty";

const SoYoungBranch = ({ tabIndex, isFocused }: any) => {
  const { isLoading, data, getData, refreshData } = useListFilter(
    getBranchListState,
    getBranchList,
    loadMoreBranchList
  );

  useEffect(() => {
    if (tabIndex === 1 && isFocused) {
      requestAnimationFrame(() => {
        refreshData();
      });
    }
  }, [tabIndex, isFocused]);

  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={
        isLoading ? (
          <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
            <Placeholder />
          </PlaceholderSkeletons>
        ) : (
          <ListEmpty isLoading={isLoading} title="Không tìm thấy phòng khám" />
        )
      }
    />
  );
};

export default SoYoungBranch;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#F5F9FA",
  },
  container: {
    paddingTop: 12,
    paddingBottom: 30,
    minHeight: _height,
  },
});
