import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import RenderHTML from "../../Components/RenderHTML/RenderHTML";
import { _moderateScale } from "@Constant/Scale";
import { Product } from "@typings/product";

type Props = {
  product: Product;
};

const Introduce = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <RenderHTML data={product?.advantageDescription} />
    </View>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2), paddingBottom: 30 },
});
