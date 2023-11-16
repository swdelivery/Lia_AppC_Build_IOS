import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { sizeText } from "@Constant/Text";
import { MyVoucher } from "@typings/voucher";
import moment from "moment";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: MyVoucher;
  onDetails: (item: MyVoucher) => void;
  onUseCoupon: (item: MyVoucher) => void;
};

export default function CardVoucher({  }: Props) {

  return (
    <TouchableOpacity activeOpacity={1} style={styles.voucherBox}>
      <View style={[styles.voucherBox__left,shadow]}>
        <Image source={{uri:`https://quangcaoytuong.vn/userfiles/users/5d85354d9c2a5a9251814a206bb09b7bdda23272629db699ed2cf6918f11b3a6/voucher-1-quang-cao-y-tuong.jpeg`}} style={styles.avatarVoucher}  />
        <Column flex={1} marginLeft={8}>
          <Text numberOfLines={1} weight='medium' size={12}>LiA VC</Text>
          <Text  numberOfLines={2} weight="bold" size={12}>
            Giảm 10% cho đơn hàng từ 1tr trở lên
          </Text>
          <Text numberOfLines={2}  weight='regular' size={12}>
            Hiệu lực đến:{" "}
            {moment().format("DD/MM/YYYY")}
          </Text>
        </Column>
      </View>
      <View style={styles.dashLine} />
      <View style={[styles.voucherBox__right,shadow]}>
        <TouchableOpacity
          style={styles.voucherBox__right__btn}
        >
          <Text color={WHITE} size={12} weight="bold">
            Sử dụng
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 3),
    borderRadius:4,
    ...styleElement.centerChild,
    backgroundColor: BASE_COLOR,
  },
  avatarVoucher: {
    width: _moderateScale(8 * 7),
    height: _moderateScale(8 * 7),
    borderRadius: _moderateScale(8),
  },
  dashLine: {
    width: 1,
    height: _moderateScale(8 * 8),
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderWidth: 1,
    top: _moderateScale(8),
    borderColor: WHITE,
  },
  voucherBox__left: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8),
    paddingVertical: 0,
  },
  voucherBox__right: {
    width: _moderateScale(8 * 10),
    minHeight: _moderateScale(8 * 9),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  voucherBox: {
    width: _widthScale(300),
    // height: _moderateScale(8 * 10),
    alignSelf: "center",
    flexDirection: "row",
    margin:4
  },
  container: {
    flex: 1,
  },
  btn: {
    borderRadius: 4,
    backgroundColor: BASE_COLOR,
  },
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 2
}