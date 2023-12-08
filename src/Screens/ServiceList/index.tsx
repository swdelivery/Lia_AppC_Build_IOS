import LiAHeader from "@Components/Header/LiAHeader";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getServices, loadMoreServices } from "@Redux/service/actions";
import { getServiceListState } from "@Redux/service/selectors";
import ServiceItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungService/components/ServiceItem";
import { RenderItemProps } from "@typings/common";
import { Service } from "@typings/serviceGroup";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import useItemExtractor from "src/Hooks/useItemExtractor";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function ServiceList({}: Props) {
  const { data, isLoading, getData, loadMoreData, refreshData } = useListFilter(
    getServiceListState,
    getServices,
    loadMoreServices
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<Service>) {
    return <ServiceItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách dịch vụ" />
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
