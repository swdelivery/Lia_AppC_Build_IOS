import React, { memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  _moderateScale,
  _widthScale,
  _heightScale,
  _width,
  _height,
} from "../../../Constant/Scale";
import _ from "lodash";
import { RenderItemProps } from "@typings/common";
import BranchItem from "@Screens/SoYoungBranch/components/BranchItem";
import { Branch } from "@typings/branch";
import useItemExtractor from "src/Hooks/useItemExtractor";

const ListBranch = memo((props) => {
  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Branch>((item) => item._id);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      data={props?.data?.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 30,
    minHeight: _height,
  },
  viewAll: {
    alignItems: "flex-end",
    borderRadius: 8,
    paddingVertical: 4,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 1,
};

export default ListBranch;
