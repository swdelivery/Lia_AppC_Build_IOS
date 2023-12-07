import LiAHeader from "@Components/Header/LiAHeader";
import ListEmpty from "@Components/ListEmpty";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getDoctorList, loadMoreDoctorList } from "@Redux/doctor/actions";
import { getDoctorListState } from "@Redux/doctor/selectors";
import {
  getPractitionerList,
  loadMorePractitionerList,
} from "@Redux/practitioner/actions";
import { getPractitionerListState } from "@Redux/practitioner/selectors";
import DoctorItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungDoctor/components/DoctorItem";
import PractitionerItem from "@Screens/SoYoungPractitioner/components/PractitionerItem";
import { RenderItemProps } from "@typings/common";
import { Practitioner } from "@typings/practitioner";
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function PractitionerList({}: Props) {
  const { data, isLoading, getData, loadMoreData, refreshData } = useListFilter(
    getPractitionerListState,
    getPractitionerList,
    loadMorePractitionerList
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<Practitioner>) {
    return <PractitionerItem item={item} />;
  }

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách chuyên viên" />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        refreshing={isLoading}
        onRefresh={refreshData}
        ListEmptyComponent={
          isLoading ? (
            <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
              <Placeholder />
            </PlaceholderSkeletons>
          ) : (
            <ListEmpty
              isLoading={isLoading}
              title="Không tìm thấy chuyên viên"
            />
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 8 * 2,
    paddingHorizontal: 8 * 1,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
  },
});
