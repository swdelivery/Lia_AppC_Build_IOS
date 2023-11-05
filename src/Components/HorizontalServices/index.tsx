import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { ScrollView } from "react-native-gesture-handler";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { BranchService } from "@typings/branch";
import FastImage from "@Components/FastImage";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  title?: string;
  items: BranchService[];
};
const HorizontalServices = ({ items, title }: Props) => {
  function renderItem(item: BranchService, index: number) {
    return <BranchServiceItem item={item} key={item._id} />;
  }

  return (
    <View style={styles.container}>
      {!!title && <Text style={styles.rcmService}>{title}</Text>}
      <View>
        <ScrollView horizontal>{items.map(renderItem)}</ScrollView>
      </View>
    </View>
  );
};

function BranchServiceItem({ item }: { item: BranchService }) {
  const serviceImage = useMemo(() => {
    return getImageAvataUrl(
      item.service.representationFileArr[0],
      "https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg"
    );
  }, [item]);

  return (
    <View style={styles.itemContainer}>
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
    </View>
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
  rcmService: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  container: {
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(0),
    padding: _moderateScale(8 * 2),
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
});
