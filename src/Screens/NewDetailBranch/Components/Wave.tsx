import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import IconLiXi from "../../../SGV/lixi.svg";
import Text from "@Components/Text";

const Wave = () => {
  return (
    <View style={styles.wave}>
      <IconLiXi width={_moderateScale(8 * 4)} height={_moderateScale(8 * 4)} />
      <View style={{ width: _moderateScale(8 * 1) }} />
      <View style={styles.voucherBox}>
        <View style={styles.voucherBox__dotWhiteL} />
        <View style={styles.voucherBox__dotWhiteR} />

        <Text style={styles.voucherBox__text}>399K</Text>
      </View>

      <View style={{ width: _moderateScale(8 * 2) }} />
      <View style={styles.voucherBox}>
        <View style={styles.voucherBox__dotWhiteL} />
        <View style={styles.voucherBox__dotWhiteR} />

        <Text style={styles.voucherBox__text}>1.200K</Text>
      </View>
      <View style={{ width: _moderateScale(8 * 2) }} />

      <View style={styles.voucherBox}>
        <View style={styles.voucherBox__dotWhiteL} />
        <View style={styles.voucherBox__dotWhiteR} />

        <Text style={styles.voucherBox__text}>2.900K</Text>
      </View>
    </View>
  );
};

export default Wave;

const styles = StyleSheet.create({
  voucherBox__text: {
    fontSize: _moderateScale(12),
    color: "red",
    alignSelf: "center",
    fontWeight: "bold",
  },
  voucherBox__dotWhiteR: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    backgroundColor: "white",
    position: "absolute",
    right: -_moderateScale(4),
  },
  voucherBox__dotWhiteL: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    backgroundColor: "white",
    position: "absolute",
    left: -_moderateScale(4),
  },
  voucherBox: {
    width: _widthScale(8 * 8),
    height: _moderateScale(8 * 3),
    backgroundColor: "#FCEFF2",
    borderRadius: 2,
    justifyContent: "center",
  },
  wave: {
    flexDirection: "row",
    alignItems: "center",
    width: _width,
    // height: _moderateScale(8 * 6),
    paddingTop: 16,
    borderTopLeftRadius: _moderateScale(8 * 4),
    borderTopRightRadius: _moderateScale(8 * 4),
    top: -_moderateScale(8 * 3),
    backgroundColor: "white",
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
