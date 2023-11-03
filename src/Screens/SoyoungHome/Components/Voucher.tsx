import React, { memo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import FastImage from "@Components/FastImage";

const Voucher = () => {
  const { navigate } = useNavigate();
  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.LIA_VOUCHER)}
      style={{ alignSelf: "center" }}
    >
      <FastImage
        auto
        style={styles.image}
        source={require("../../../Image/voucher.png")}
      />
    </TouchableOpacity>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  image: {
    width: _widthScale(350),
    borderRadius: _moderateScale(8),
  },
});
