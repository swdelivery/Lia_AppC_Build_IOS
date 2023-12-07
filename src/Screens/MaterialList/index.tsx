import LiAHeader from "@Components/Header/LiAHeader";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getMaterialList, loadMoreMaterialList } from "@Redux/material/actions";
import { getMaterialListState } from "@Redux/material/selectors";
import MaterialItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungMaterial/components/MaterialItem";
import { RenderItemProps } from "@typings/common";
import { Material } from "@typings/material";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import useItemExtractor from "src/Hooks/useItemExtractor";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function MaterialList({}: Props) {
  const { data, isLoading, getData, loadMoreData, refreshData } = useListFilter(
    getMaterialListState,
    getMaterialList,
    loadMoreMaterialList
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<Material>) {
    return <MaterialItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Material>((item) => item._id);

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách vật liệu" />
      <FlatList
        contentContainerStyle={styles.container}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreData}
        refreshing={isLoading}
        onRefresh={refreshData}
        ListEmptyComponent={
          isLoading ? (
            <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
              <Placeholder />
            </PlaceholderSkeletons>
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 60,
    paddingRight: 8,
    backgroundColor: "#F5F9FA",
  },
});
