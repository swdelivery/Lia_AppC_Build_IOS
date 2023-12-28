import React, { memo, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR, BASE_COLOR_LIGHT } from "@Constant/Color";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const SoYoungPractitioner = memo(({ tabIndex, isFocused }: any) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
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
    <>
      <Column backgroundColor={"#F5F9FA"} paddingHorizontal={8} paddingTop={8}>
        <Pressable
          style={styles.viewAll}
          onPress={navigate(ScreenKey.PRACTITIONER_LIST)}
        >
          <Text color={BASE_COLOR} fontStyle="italic">{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
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
            <ListEmpty
              isLoading={isLoading}
              title="Không tìm thấy chuyên viên"
            />
          )
        }
      />
    </>
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
    paddingTop: 8,
    paddingHorizontal: 8 * 1,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
    minHeight: _height,
  },
  viewAll: {
    alignItems: "flex-end",
    borderRadius: 8,
    paddingVertical: 4,
  },
});
