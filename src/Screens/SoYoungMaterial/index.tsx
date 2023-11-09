import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { _width } from "../../Constant/Scale";
import MaterialItem from "./components/MaterialItem";
import { useDispatch, useSelector } from "react-redux";
import { useFocused } from "src/Hooks/useNavigation";
import { getServiceListState } from "@Redux/service/selectors";
import { FlatList } from "react-native";
import { RenderItemProps } from "@typings/common";
import { Service } from "@typings/serviceGroup";
import useCallbackItem from "src/Hooks/useCallbackItem";
import useItemExtractor from "src/Hooks/useItemExtractor";
import { getListMaterial } from "@Redux/Action/Material";

const SoYoungMaterial = () => {
  const dispatch = useDispatch();

  const [listMaterial, setListMaterial] = useState([])

  useEffect(() => {
    _getData()
  }, [])

  const _getData = async () => {
    let result = await getListMaterial({});
    if (result?.isAxiosError) return;
    console.log({result});
    
    setListMaterial(result?.data?.data)
  }

  const _renderItem = ({ item, index }) => {
    console.log({item});
    

    return (
      <MaterialItem item={item} />
    )
  }


  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      numColumns={2}
      data={listMaterial}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default SoYoungMaterial;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 30,
    backgroundColor: "#F5F9FA",
  },
});
