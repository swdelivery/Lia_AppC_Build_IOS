import { StyleSheet, View, Image } from "react-native";
import React, { memo } from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import CountDownTimer from "../../../Components/CountDownTimer/CountDownTimer";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import Row from "@Components/Row";
import Column from "@Components/Column";

const FlashSale = () => {
  return (
    <View>
      <View style={styles.flashsale}>
        <Image
          style={{
            width: _moderateScale(8 * 15),
            height: _moderateScale(8 * 5),
            resizeMode: "contain",
            borderRadius: 16,
          }}
          source={require("../../../Image/flashSaleIcon.png")}
        />

        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <CountDownTimer />
          <Text style={styles.flashsale__text}>Reference site about</Text>
        </View>
      </View>

      <Row style={styles.priceFlashSale} gap={16}>
        <Row style={styles.priceFlashSale__filnalPrice} gap={4}>
          <Text weight="bold" color={RED}>
            Giá cuối
          </Text>
          <Text weight="bold" size={20} color={RED}>
            1.900K
          </Text>
        </Row>

        <View style={styles.priceFlashSale__filnalPrice}>
          <Text weight="bold" size={20} color={RED}>
            =
          </Text>
        </View>
        <Column alignItems="center">
          <Text weight="bold" color={RED}>
            Giá gốc
          </Text>
          <Text weight="bold" size={20} color={RED}>
            3.900K
          </Text>
        </Column>

        <View style={styles.priceFlashSale__filnalPrice}>
          <Text weight="bold" size={20} color={RED}>
            -
          </Text>
        </View>

        <Column alignItems="center">
          <Text weight="bold" color={RED}>
            FlashSale
          </Text>
          <Text weight="bold" size={20} color={RED}>
            2.000K
          </Text>
        </Column>
      </Row>
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  priceFlashSale__filnalPrice: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceFlashSale: {
    width: _widthScale(360),
    height: _moderateScale(8 * 8),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 1),
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  flashsale__text: {
    fontSize: _moderateScale(16),
  },
  flashsale: {
    flexDirection: "row",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
  },
});
