import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { _width } from "../../Constant/Scale";
import ServiceItem, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "./components/ServiceItem";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "@Redux/service/actions";
import { getServiceListState } from "@Redux/service/selectors";
import { FlatList } from "react-native";
import { RenderItemProps } from "@typings/common";
import { Service } from "@typings/serviceGroup";
import useItemExtractor from "src/Hooks/useItemExtractor";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR_LIGHT } from "@Constant/Color";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";

const SoYoungService = ({ tabIndex, isFocused }: any) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { isLoading, data } = useSelector(getServiceListState);

  useEffect(() => {
    if (tabIndex === 0 && isFocused) {
      requestAnimationFrame(() => {
        dispatch(getServices.request());
      });
    }
  }, [tabIndex, isFocused]);

  function renderItem({ item }: RenderItemProps<Service>) {
    return <ServiceItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

  return (
    <AfterTimeoutFragment
      timeout={2000}
      placeholder={
        <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
          <Placeholder />
        </PlaceholderSkeletons>
      }
    >
      <Column backgroundColor={"#F5F9FA"} paddingHorizontal={8} paddingTop={8}>
        <Pressable
          style={styles.viewAll}
          onPress={navigate(ScreenKey.SERVICE_LIST)}
        >
          <Text
            color={BASE_COLOR_LIGHT}
            fontStyle="italic"
          >{`Xem tất cả >>`}</Text>
        </Pressable>
      </Column>
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
              <Placeholder />
            </PlaceholderSkeletons>
          ) : null
        }
        removeClippedSubviews
      />
    </AfterTimeoutFragment>
  );
};

export default SoYoungService;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 60,
    paddingRight: 8,
    backgroundColor: "#F5F9FA",
  },
  viewAll: {
    alignItems: "flex-end",
    borderRadius: 8,
    paddingVertical: 4,
  },
});
