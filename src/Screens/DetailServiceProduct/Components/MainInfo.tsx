import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { BLACK, PRICE_ORANGE } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { Product } from "@typings/product";

const MainInfo = memo(({ product }: { product: Product }) => {
  return (
    <View style={styles.box}>
      <Column gap={8}>
        <Text weight="bold" size={14}>
          {product?.name}
        </Text>
        <Text weight="bold" size={14} color={PRICE_ORANGE}>
          {formatMonney(product?.price)} VNĐ
        </Text>

        <Text weight="regular" size={14} color={BLACK}>
          {product?.description}
        </Text>
      </Column>
    </View>
  );
});

export default MainInfo;

const styles = StyleSheet.create({
  box: {
    margin: _moderateScale(8 * 2),
  },
});
