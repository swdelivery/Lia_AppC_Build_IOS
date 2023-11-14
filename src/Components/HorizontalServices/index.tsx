import { StyleProp, StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { BranchService } from "@typings/branch";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { ViewStyle } from "react-native";
import Image from "@Components/Image";
import { first } from "lodash";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import { Service } from "@typings/serviceGroup";

type Props = {
  title?: string;
  items: BranchService[];
  containerStyle?: StyleProp<ViewStyle>;
};
const HorizontalServices = ({ items, title, containerStyle }: Props) => {
  const handlePress = useServiceDetailsNavigation();

  function renderItem(item: BranchService, index: number) {
    if (!item || !item.service) {
      return null;
    }
    return (
      <BranchServiceItem item={item} key={item._id} onPress={handlePress} />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {!!title && (
        <Text left={16} weight="bold">
          {title}
        </Text>
      )}
      <View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {items.map(renderItem)}
        </ScrollView>
      </View>
    </View>
  );
};

function BranchServiceItem({
  item,
  onPress,
}: {
  item: BranchService;
  onPress: (item: Service) => void;
}) {
  const trigger = useCallbackItem(item.service);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.itemContainer}
      onPress={trigger(onPress)}
    >
      <Image
        style={styles.serviceImage}
        avatar={first(item.service?.representationFileArr)}
      />
      <Text color={"black"} size={10} weight="bold" numberOfLines={1} top={4}>
        {item?.service?.name}
      </Text>
      <CountStar2
        size={10}
        rating={item?.service?.averageRating}
        count={item.service?.reviewCount}
      />
      <Text size={10} weight="bold" color={RED}>
        {`₫${formatMonney(item.service?.price ?? 0)}`}
      </Text>
    </TouchableOpacity>
  );
}

export default HorizontalServices;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  container: {
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    marginTop: _moderateScale(0),
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
    height: 75,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
