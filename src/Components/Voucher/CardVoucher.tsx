import Column from "@Components/Column";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { BASE_COLOR, GREY, WHITE } from "@Constant/Color";
import { _moderateScale, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { clearCoupon, selectCoupon } from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import { MyVoucher } from "@typings/voucher";
import moment from "moment";
import React, { useCallback } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  data: any;
};

export default function CardVoucher({ data }: Props) {

  const dispatch = useDispatch()
  const { navigate } = useNavigate()

  const { dataCoupon, dataServices } = useSelector(getDataCreateBookingState)

  const _handleSelectCoupon = useCallback(() => {
    let totalPriceSerive = dataServices?.reduce((sum, { price }) => sum + price, 0);

    if (totalPriceSerive == 0) {
      return Alert.alert(`Hãy chọn dịch vụ trước`)
    }

    if (totalPriceSerive < data?.coupon?.minRequiredOrderAmount) {
      return Alert.alert(`Bạn cần đạt giá trị đơn hàng tối thiểu ${formatMonney(data?.coupon?.minRequiredOrderAmount)} để sử dụng Voucher này`)
    }
    dispatch(selectCoupon(data))
  }, [data, dataServices])

  const _handleClearCoupon = useCallback(() => {
    dispatch(clearCoupon(data))
  }, [data])



  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
        data: { ...data?.coupon, isTaked: true },
        infoVoucher: data
      })}
      activeOpacity={.5} style={styles.voucherBox} >
      <View style={[styles.voucherBox__left, shadow]}>
        <Image avatar={data?.coupon?.couponImg} style={styles.avatarVoucher} />
        <Column flex={1} marginLeft={8}>
          <Text numberOfLines={1} weight='medium' size={12}>{data?.coupon?.name}</Text>
          <Text numberOfLines={2} weight='medium' size={10}>
            {data?.coupon?.description}
          </Text>
          <Text numberOfLines={2} weight='regular' size={10}>
            Hiệu lực đến:{" "}
            {moment(data?.coupon?.expiredAt).format("DD/MM/YYYY")}
          </Text>
        </Column>
      </View>
      <View style={styles.dashLine} />
      <View style={[styles.voucherBox__right, shadow]}>
        {
          dataCoupon?.coupon?.code == data?.coupon?.code ?
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={_handleClearCoupon}
              style={[styles.voucherBox__right__btn, { backgroundColor: GREY }]}
            >
              <Text color={WHITE} size={12} weight="bold">
                Huỷ
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={_handleSelectCoupon}
              style={styles.voucherBox__right__btn}
            >
              <Text color={WHITE} size={12} weight="bold">
                Sử dụng
              </Text>
            </TouchableOpacity>
        }

      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 3),
    borderRadius: 4,
    ...styleElement.centerChild,
    backgroundColor: BASE_COLOR,
  },
  avatarVoucher: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
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
    margin: 4
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
