import LiAHeader from "@Components/Header/LiAHeader";
import ListEmpty from "@Components/ListEmpty";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Screen from "@Components/Screen";
import { getDoctorList, loadMoreDoctorList } from "@Redux/doctor/actions";
import { getDoctorListState } from "@Redux/doctor/selectors";
import DoctorItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "@Screens/SoYoungDoctor/components/DoctorItem";
import { RenderItemProps } from "@typings/common";
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useListFilter from "src/Hooks/useListFilter";

type Props = {};

export default function DoctorList({}: Props) {
  const { data, isLoading, getData } = useListFilter(
    getDoctorListState,
    getDoctorList,
    loadMoreDoctorList
  );

  useEffect(() => {
    getData();
  }, []);

  function renderItem({ item }: RenderItemProps<any>) {
    return <DoctorItem item={item} />;
  }

  return (
    <Screen>
      <LiAHeader safeTop title="Danh sách bác sĩ" />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? (
            <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
              <Placeholder />
            </PlaceholderSkeletons>
          ) : (
            <ListEmpty isLoading={isLoading} title="Không tìm thấy bác sĩ" />
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
