import { StyleProp, StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale, _width, _widthScale } from "src/Constant/Scale";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { ViewStyle } from "react-native";
import Image from "@Components/Image";
import { Service } from "@typings/serviceGroup";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import Column from "@Components/Column";
import { RenderItemProps } from "@typings/common";
import CachedImageView from "@Components/CachedImage";

type Props = {
  title?: string;
  items: Service[];
  containerStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
};
const HorizontalServicesV2 = ({
  items = [],
  title,
  containerStyle,
  paddingHorizontal = 16,
}: Props) => {
  const handlePress = useServiceDetailsNavigation();

  function renderItem({ item }: RenderItemProps<Service>) {
    return <ServiceItem item={item} key={item._id} onPress={handlePress} />;
  }

  return (
    <Column
      paddingHorizontal={paddingHorizontal}
      style={[styles.container, containerStyle]}
    >
      {!!title && (
        <Text left={0} weight="bold">
          {title}
        </Text>
      )}
      <View>
        <FlatList
          horizontal
          data={items}
          renderItem={renderItem}
          windowSize={10}
          initialNumToRender={5}
          maxToRenderPerBatch={3}
          removeClippedSubviews
        />
      </View>
    </Column>
  );
};

function ServiceItem({
  item,
  onPress,
}: {
  item: Service;
  onPress: (item: Service) => void;
}) {
  const trigger = useCallbackItem(item);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.itemContainer}
      onPress={trigger(onPress)}
    >
      <CachedImageView style={styles.serviceImage} avatar={item.avatar} />
      <Text color={"black"} size={10} weight="bold" numberOfLines={1} top={4}>
        {item?.name}
      </Text>
      <CountStar2
        size={10}
        rating={item?.averageRating}
        count={item?.reviewCount}
      />
      <Text size={10} weight="bold" color={RED}>
        {`₫${formatMonney(item?.price)}`}
      </Text>
    </TouchableOpacity>
  );
}

export default HorizontalServicesV2;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  container: {
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 0,
    gap: 8,
  },
  itemContainer: {
    width: 100,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 8 * 1,
  },
  serviceImage: {
    width: 100,
    height: 100 * SERVICE_BANNER_RATIO,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  contentContainer: {},
});
