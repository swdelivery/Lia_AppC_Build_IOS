import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import PractitionerItem, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./components/PractitionerItem";
import { useDispatch, useSelector } from "react-redux";
import { getPractitionerList } from "@Redux/practitioner/actions";
import { getPractitionerListState } from "@Redux/practitioner/selectors";
import { FlatList } from "react-native-gesture-handler";
import { RenderItemProps } from "@typings/common";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import ListEmpty from "@Components/ListEmpty";

const SoYoungPractitioner = memo(({ tabIndex, isFocused }: any) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(getPractitionerListState);

  useEffect(() => {
    if (tabIndex === 3 && isFocused) {
      requestAnimationFrame(() => {
        dispatch(getPractitionerList.request());
      });
    }
  }, [tabIndex, isFocused]);

  function renderItem({ item }: RenderItemProps<any>) {
    return <PractitionerItem item={item} />;
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
          <ListEmpty isLoading={isLoading} title="Không tìm thấy phòng khám" />
        )
      }
    />
  );
});

export default SoYoungPractitioner;

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
