import Column from "@Components/Column";
import { _height } from "@Constant/Scale";
import { getProducts, loadMoreProducts } from "@Redux/product/actions";
import { getProductsState } from "@Redux/product/selectors";
import { RenderItemProps } from "@typings/common";
import { Product } from "@typings/product";
import React, { useEffect } from "react";
import { StyleSheet, Pressable, FlatList } from "react-native";
import useListFilter from "src/Hooks/useListFilter";
import ProductItem from "./components/ProductItem";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Text from "@Components/Text";
import { BASE_COLOR } from "@Constant/Color";
import ListEmpty from "@Components/ListEmpty";

type Props = {};

export default function SoyoungProduct({}: Props) {
  const { navigate } = useNavigate();
  const { isLoading, data, getData } = useListFilter(
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

  return (
    <>
      <Column backgroundColor={"#F5F9FA"} paddingHorizontal={8} paddingTop={8}>
        <Pressable
          style={styles.viewAll}
          onPress={navigate(ScreenKey.PRODUCT_LIST)}
        >
          <Text color={BASE_COLOR} fontStyle="italic">{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
      <FlatList
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<ListEmpty title="Chưa có thông tin sản phẩm" />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 30,
    backgroundColor: "#F5F9FA",
    minHeight: _height,
  },
  viewAll: {
    alignItems: "flex-end",
    borderRadius: 8,
    paddingVertical: 4,
  },
});
