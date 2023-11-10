import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import MaterialItem from "./components/MaterialItem";
import { useDispatch } from "react-redux";
import { FlatList } from "react-native";
import { getListMaterial } from "@Redux/Action/Material";

const SoYoungMaterial = () => {
  const dispatch = useDispatch();

  const [listMaterial, setListMaterial] = useState([]);

  useEffect(() => {
    _getData();
  }, []);

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
