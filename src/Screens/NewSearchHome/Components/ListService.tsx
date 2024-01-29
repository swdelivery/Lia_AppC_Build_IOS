import React from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  _moderateScale,
  _widthScale,
  _heightScale,
  _width,
} from "../../../Constant/Scale";
import useItemExtractor from "src/Hooks/useItemExtractor";
import { Service } from "@typings/serviceGroup";
import ServiceItem from "@Screens/SoYoungService/components/ServiceItem";
import { RenderItemProps } from "@typings/common";
import { isTablet } from "src/utils/platform";

const ListService = (props) => {
  function renderItem({ item, index }: RenderItemProps<Service>) {
    const numColumns = isTablet ? 3 : 2;
    return (
      <ServiceItem
        item={item}
        numColumns={numColumns}
        isFirstInRow={index % numColumns === 0}
      />
    );
  }
  const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      numColumns={2}
      data={props?.data?.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews
    />
  );
};

const styles = StyleSheet.create({
  list: {},
  container: {
    paddingTop: 8,
    paddingBottom: 60,
    marginHorizontal: _moderateScale(10),
    gap: 8,
  },
});

export default ListService;
