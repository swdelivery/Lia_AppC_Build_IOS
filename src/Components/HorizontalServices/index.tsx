import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { BranchService } from "@typings/branch";
import FastImage from "@Components/FastImage";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { getImageAvataUrl } from "src/utils/avatar";
import { useNavigate } from "src/Hooks/useNavigation";
import useCallbackItem from "src/Hooks/useCallbackItem";
import ScreenKey from "@Navigation/ScreenKey";
import { ViewStyle } from "react-native";

type Props = {
  title?: string;
  items: BranchService[];
  containerStyle?: StyleProp<ViewStyle>;
};
const HorizontalServices = ({ items, title, containerStyle }: Props) => {
  const { navigation } = useNavigate();

  const handlePress = useCallback((item: BranchService) => {
    navigation.navigate(ScreenKey.DETAIL_SERVICE, {
      idService: item._id,
    });
  }, []);

  function renderItem(item: BranchService, index: number) {
    return (
      <BranchServiceItem item={item} key={item._id} onPress={handlePress} />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {!!title && <Text weight="bold">{title}</Text>}
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
  onPress: (item: BranchService) => void;
}) {
  const trigger = useCallbackItem(item);

  const serviceImage = useMemo(() => {
    return getImageAvataUrl(
      item.service.representationFileArr[0],
      "https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg"
    );
  }, [item]);

  return (
    <Pressable style={styles.itemContainer} onPress={trigger(onPress)}>
      <FastImage style={styles.serviceImage} uri={serviceImage} />
      <Text color={"black"} size={10} weight="bold" numberOfLines={1} top={4}>
        {item.service.name}
      </Text>
      <CountStar2
        size={10}
        rating={item.service.averageRating}
        count={item.service.reviewCount}
      />
      <Text size={10} weight="bold" color={RED}>
        {`₫${formatMonney(item.service.price)}`}
      </Text>
    </Pressable>
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
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
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
