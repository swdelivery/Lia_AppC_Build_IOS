import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import MaterialItem from "./components/MaterialItem";
import { FlatList } from "react-native";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR, BASE_COLOR_LIGHT } from "@Constant/Color";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import useListFilter from "src/Hooks/useListFilter";
import { getMaterialListState } from "@Redux/material/selectors";
import { getMaterialList, loadMoreMaterialList } from "@Redux/material/actions";
import ListEmpty from "@Components/ListEmpty";

const SoYoungMaterial = ({ tabIndex, isFocused }: any) => {
  const { navigate } = useNavigate();
  const { data, refreshData } = useListFilter(
    getMaterialListState,
    getMaterialList,
    loadMoreMaterialList
  );

  useEffect(() => {
    refreshData();
  }, []);

  const _renderItem = ({ item, index }) => {
    return <MaterialItem item={item} />;
  };

  return (
    <>
      <Column backgroundColor={"#F5F9FA"} paddingHorizontal={8} paddingTop={8}>
        <Pressable
          style={styles.viewAll}
          onPress={navigate(ScreenKey.MATERIAL_LIST)}
        >
          <Text color={BASE_COLOR} fontStyle="italic">{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
      <FlatList
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        numColumns={2}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<ListEmpty title="Chưa có thông tin vật liệu" />}
      />
    </>
  );
};

export default SoYoungMaterial;

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
