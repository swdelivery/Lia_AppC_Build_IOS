import LiAHeader from "@Components/Header/LiAHeader";
import ListEmpty from "@Components/ListEmpty";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getBranchList, loadMoreBranchList } from "@Redux/branch/actions";
import { getBranchListState } from "@Redux/branch/selectors";
import BranchItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungBranch/components/BranchItem";
import { RenderItemProps } from "@typings/common";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function BranchList({}: Props) {
  const { data, isLoading, getData } = useListFilter(
    getBranchListState,
    getBranchList,
    loadMoreBranchList
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách phòng khám" />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? (
            <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
              <Placeholder />
            </PlaceholderSkeletons>
          ) : (
            <ListEmpty
              isLoading={isLoading}
              title="Không tìm thấy phòng khám"
            />
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
  },
});
