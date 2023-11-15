import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import DoctorItem, {
  Placeholder,
  PLACEHOLDER_HEIGHT,
} from "./components/DoctorItem";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import useListFilter from "src/Hooks/useListFilter";
import { getDoctorListState } from "@Redux/doctor/selectors";
import { getDoctorList, loadMoreDoctorList } from "@Redux/doctor/actions";
import ListEmpty from "@Components/ListEmpty";
import { FlatList } from "react-native-gesture-handler";
import { RenderItemProps } from "@typings/common";

const SoYoungDoctor = () => {
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
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
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
  );
};

export default SoYoungDoctor;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: 220,
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width - 8 * 2,
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    paddingHorizontal: 8 * 1,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
    minHeight: _height,
  },
});
