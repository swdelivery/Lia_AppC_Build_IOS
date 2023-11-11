import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { BASE_COLOR, WHITE } from "../../Constant/Color";
import LiAHeader from "../../Components/Header/LiAHeader";
import LinearGradient from "react-native-linear-gradient";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { sizeText } from "../../Constant/Text";
import Animated, { useSharedValue } from "react-native-reanimated";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { getPartnerCoupon } from "../../Redux/Action/BookingAction";
import moment from "moment";
import { URL_ORIGINAL } from "../../Constant/Url";
import VoucherItem from "./Components/VoucherItem";
import { MyVoucher, Voucher } from "@typings/voucher";
import MyVoucherItem from "./Components/MyVoucherItem";
import { useNavigate } from "src/Hooks/useNavigation";

const MyVouchers = () => {
  const { navigation } = useNavigate();
  const [listVoucher, setListVoucher] = useState([]);

  useEffect(() => {
    _getListCoupon();
  }, []);

  const _getListCoupon = async () => {
    let result = await getPartnerCoupon({
      condition: {
        // "usedAt": {
        //     "equal": null
        // }
      },
    });
    if (result?.isAxiosError) return;
    setListVoucher(result?.data?.data);
  };

  const handleUseCoupon = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.CREATE_BOOKING);
  }, []);

  const handleViewDetails = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
      data: { ...item.coupon, isTaked: true },
    });
  }, []);

  return (
    <View style={styles.container}>
      <LiAHeader
        safeTop
        bg="transparent"
        barStyle={"light-content"}
        title={"Mã giảm giá của tôi"}
      />
      <LinearGradient
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[BASE_COLOR, "white"]}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {listVoucher?.map((item, index) => {
          return (
            <MyVoucherItem
              item={item}
              onDetails={handleViewDetails}
              onUseCoupon={handleUseCoupon}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyVouchers;

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    backgroundColor: BASE_COLOR,
    borderRadius: _moderateScale(4),
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
  },
  voucherBox__right: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  voucherBox: {
    width: _widthScale(340),
    height: _moderateScale(8 * 10),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 2),
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  contentContainer: {
    paddingBottom: 60,
  },
});
