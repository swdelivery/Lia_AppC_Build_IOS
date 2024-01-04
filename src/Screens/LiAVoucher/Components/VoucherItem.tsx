import Column from "@Components/Column";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { BASE_COLOR, GREY, WHITE } from "@Constant/Color";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { sizeText } from "@Constant/Text";
import { Voucher } from "@typings/voucher";
import moment from "moment";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: Voucher;
  onDetails: (item: any) => void;
  onTakeVoucher?: (item: any) => void;
  animatedSecondColor: SharedValue<string>;
};

export default function VoucherItem({
  item,
  onDetails,
  onTakeVoucher,
  animatedSecondColor,
}: Props) {
  const trigger = useCallbackItem(item);

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedSecondColor.value,
    };
  });

  return (
    <TouchableOpacity onPress={trigger(onDetails)} style={styles.voucherBox}>
      <View style={styles.voucherBox__left}>
        <Image style={styles.avatarVoucher} avatar={item?.couponImg} />
        <Column flex={1} marginLeft={8}>
          <Text numberOfLines={2} style={sizeText.small_500}>{item?.code.toUpperCase()}</Text>
          <Text numberOfLines={2} style={sizeText.small_bold}>
            {item?.description}
          </Text>
          <Text fontStyle="italic" size={12} numberOfLines={2}>
            Hiệu lực đến ngày: <Text weight="bold" color={"#AA827C"} fontStyle="italic" size={12}>
              {moment(item?.expiredAt).format("DD/MM/YYYY")}
            </Text>
          </Text>
        </Column>
      </View>
      <View style={styles.dashLine} />
      <View style={styles.voucherBox__right}>
        {item?.isTaked ? (
          <Column
            style={styles.voucherBox__right__btn}
            backgroundColor={GREY}
            borderRadius={4}
          >
            <Text color={WHITE} size={12} weight="bold">
              Đã lấy
            </Text>
          </Column>
        ) : (
          <Animated.View style={[styles.btn, animBG]}>
            <TouchableOpacity
              onPress={trigger(onTakeVoucher)}
              style={styles.voucherBox__right__btn}
            >
              <Text color={WHITE} size={12} weight="bold">
                Lấy mã
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 3),
    ...styleElement.centerChild,
  },
  avatarVoucher: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
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
    paddingVertical: 10,
  },
  voucherBox__right: {
    width: _moderateScale(8 * 10),
    minHeight: _moderateScale(8 * 10),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  voucherBox: {
    width: _widthScale(340),
    // height: _moderateScale(8 * 10),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 2),
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  btn: {
    borderRadius: 4,
    backgroundColor: BASE_COLOR,
  },
});
