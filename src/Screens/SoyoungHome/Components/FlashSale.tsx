import Lottie from "lottie-react-native";
import React, { memo } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { _widthScale } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import Text from "@Components/Text";
import Column from "@Components/Column";
import Row from "@Components/Row";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const FlashSale = memo(() => {
  const { navigate } = useNavigate()

  const _renderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.image}
          uri={`https://img2.soyoung.com/product/20220314/9/75964f6913b08b834829758a6d88d9d8_400_300.png?imageView2/0/format/webp`}
        />
        <Text color={"red"} size={12} weight="bold" top={2}>
          đ1.900.000
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate(ScreenKey.FLASHSALE_SCREEN)}>
        <Column style={styles.fls__title} gap={4}>
          <Lottie
            speed={1}
            autoPlay={true}
            loop={true}
            style={styles.lottie}
            source={require("../../../Json/flashsale.json")}
          />
          <Text size={15} color="red" weight="bold">
            Flash Sale
          </Text>
          <Row gap={2}>
            <View style={styles.clockHours}>
              <Text color={"white"} weight="bold" size={12}>
                00
              </Text>
            </View>
            <Text>:</Text>
            <View style={styles.clockHours}>
              <Text color={"white"} weight="bold" size={12}>
                30
              </Text>
            </View>
            <Text>:</Text>
            <View style={styles.clockHours}>
              <Text color={"white"} weight="bold" size={12}>
                59
              </Text>
            </View>
          </Row>
        </Column>
      </TouchableOpacity>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={_renderItem}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        keyExtractor={({ item, index }) => index}
      />
    </View>
  );
});

export default FlashSale;

const styles = StyleSheet.create({
  btnFls: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8 * 1,
    backgroundColor: "#EB4D49",
  },
  fls__title: {
    width: 100,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: _widthScale(350),
    height: _widthScale(110),
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
  },
  lottie: { width: 50, height: 50 },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  clockHours: {
    backgroundColor: "black",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
