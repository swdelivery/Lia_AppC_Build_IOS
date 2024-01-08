import LiAHeader from "@Components/Header/LiAHeader";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getMaterialList, loadMoreMaterialList } from "@Redux/material/actions";
import { getMaterialListState } from "@Redux/material/selectors";
import { getProducts, loadMoreProducts } from "@Redux/product/actions";
import { getProductsState } from "@Redux/product/selectors";
import MaterialItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungMaterial/components/MaterialItem";
import ProductItem from "@Screens/SoyoungProduct/components/ProductItem";
import { RenderItemProps } from "@typings/common";
import { Material } from "@typings/material";
import { Product } from "@typings/product";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import useItemExtractor from "src/Hooks/useItemExtractor";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function ProductList({}: Props) {
  const { data, isLoading, getData, loadMoreData, refreshData } = useListFilter(
    getProductsState,
    getProducts,
    loadMoreProducts
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<Product>) {
    return <ProductItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Product>((item) => item._id);

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách sản phẩm" />
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
