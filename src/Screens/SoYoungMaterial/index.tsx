import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import MaterialItem from "./components/MaterialItem";
import { FlatList } from "react-native";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR_LIGHT } from "@Constant/Color";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import useListFilter from "src/Hooks/useListFilter";
import { getMaterialListState } from "@Redux/material/selectors";
import { getMaterialList, loadMoreMaterialList } from "@Redux/material/actions";

const SoYoungMaterial = ({ tabIndex, isFocused }: any) => {
  const { navigate } = useNavigate();
  const { data, refreshData } = useListFilter(
    getMaterialListState,
    getMaterialList,
    loadMoreMaterialList
  );

  useEffect(() => {
    // requestAnimationFrame(() => {
    //   refreshData();
    // });
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
          <Text
            color={BASE_COLOR_LIGHT}
            fontStyle="italic"
          >{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
      <FlatList
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        numColumns={2}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item._id}
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
