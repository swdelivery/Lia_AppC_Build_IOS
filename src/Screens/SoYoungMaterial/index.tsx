import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import MaterialItem from "./components/MaterialItem";
import { FlatList } from "react-native";
import { getListMaterial } from "@Redux/Action/Material";

const SoYoungMaterial = ({ tabIndex, isFocused }: any) => {
  const [listMaterial, setListMaterial] = useState([]);

  useEffect(() => {
    if (tabIndex === 4 && isFocused) {
      requestAnimationFrame(() => {
        _getData();
      });
    }
  }, [tabIndex, isFocused]);

  const _getData = async () => {
    let result = await getListMaterial({});
    if (result?.isAxiosError) return;
    console.log({ result });

    setListMaterial(result?.data?.data);
  };

  const _renderItem = ({ item, index }) => {
    return <MaterialItem item={item} />;
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      numColumns={2}
      data={listMaterial}
      renderItem={_renderItem}
      keyExtractor={(item, index) => item._id}
    />
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
});
