import React from "react";
import { StyleSheet, View } from "react-native";
import { _width } from "../../Constant/Scale";
import ServiceItem, { PLACEHOLDER_HEIGHT } from "./components/ServiceItem";
import { useDispatch, useSelector } from "react-redux";
import { useFocused } from "src/Hooks/useNavigation";
import { getServices } from "@Redux/service/actions";
import { getServiceListState } from "@Redux/service/selectors";
import { FlatList } from "react-native";
import { RenderItemProps } from "@typings/common";
import { Service } from "@typings/serviceGroup";
import useItemExtractor from "src/Hooks/useItemExtractor";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";

const SoYoungService = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(getServiceListState);

  useFocused(() => {
    dispatch(getServices.request());
  });

  function renderItem({ item }: RenderItemProps<Service>) {
    return <ServiceItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      numColumns={2}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        isLoading ? (
          <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
            <ServiceItem.Placeholder />
          </PlaceholderSkeletons>
        ) : null
      }
    />
  );
};

export default SoYoungService;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 30,
    backgroundColor: "#F5F9FA",
  },
});
