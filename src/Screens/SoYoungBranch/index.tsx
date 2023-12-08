import React, { memo, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { _height, _width } from "../../Constant/Scale";
import { RenderItemProps } from "../../typings/common";
import BranchItem, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./components/BranchItem";
import useListFilter from "src/Hooks/useListFilter";
import { getBranchListState } from "@Redux/branch/selectors";
import { getBranchList, loadMoreBranchList } from "@Redux/branch/actions";
import { FlatList } from "react-native-gesture-handler";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import ListEmpty from "@Components/ListEmpty";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR_LIGHT } from "@Constant/Color";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";

const SoYoungBranch = ({ tabIndex, isFocused }: any) => {
  const { navigate } = useNavigate();
  const { isLoading, data, getData, refreshData } = useListFilter(
    getBranchListState,
    getBranchList,
    loadMoreBranchList
  );

  useEffect(() => {
    if (tabIndex === 1 && isFocused) {
      requestAnimationFrame(() => {
        refreshData();
      });
    }
  }, [tabIndex, isFocused]);

  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  return (
    <AfterTimeoutFragment
      placeholder={
        <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
          <Placeholder />
        </PlaceholderSkeletons>
      }
    >
      <Column backgroundColor={"#F5F9FA"} paddingHorizontal={8} paddingTop={8}>
        <Pressable
          style={styles.viewAll}
          onPress={navigate(ScreenKey.BRANCH_LIST)}
        >
          <Text
            color={BASE_COLOR_LIGHT}
            fontStyle="italic"
          >{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
      <FlatList
        style={styles.list}
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
            <ListEmpty
              isLoading={isLoading}
              title="Không tìm thấy phòng khám"
            />
          )
        }
        removeClippedSubviews
      />
    </AfterTimeoutFragment>
  );
};

export default SoYoungBranch;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#F5F9FA",
  },
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
