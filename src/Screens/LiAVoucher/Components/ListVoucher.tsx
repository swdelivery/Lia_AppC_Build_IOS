import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { WHITE } from "../../../Constant/Color";
import { styleElement } from "../../../Constant/StyleElement";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ScreenKey from "../../../Navigation/ScreenKey";
import ModalFlashMsg from "../../../Components/ModalFlashMsg/ModalFlashMsg";
import { useDispatch, useSelector } from "react-redux";
import VoucherItem from "./VoucherItem";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import { getInfoUserReducer } from "@Redux/Selectors";
import useVisible from "src/Hooks/useVisible";
import moment from "moment";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import useListFilter from "src/Hooks/useListFilter";
import { getVouchersState } from "@Redux/voucher/selectors";
import {
  getVouchers,
  loadMoreVouchers,
  takeVoucher,
} from "@Redux/voucher/actions";
import { RenderItemProps } from "@typings/common";
import { Voucher } from "@typings/voucher";
import useItemExtractor from "src/Hooks/useItemExtractor";
import useNavigationParamUpdate from "src/Hooks/useNavigationParamUpdate";

type Props = {
  animatedSecondColor: SharedValue<string>;
};

const ListVoucher = ({ animatedSecondColor }: Props) => {
  const dispatch = useDispatch();
  const { navigation } = useNavigate();
  const { infoUser } = useSelector(getInfoUserReducer);
  const { isLoading, data, loadMoreData, refreshData } = useListFilter(
    getVouchersState,
    getVouchers,
    loadMoreVouchers
  );
  const flashMsgPopup = useVisible();

  useNavigationParamUpdate<boolean>("isTakeVoucherSuccess", (value) => {
    if (value) {
      refreshData();
      flashMsgPopup.show();
      setTimeout(() => {
        flashMsgPopup.hide();
      }, 500);
    }
  });

  useFocused(() => {
    refreshData();
  });

  const handleViewDetails = useCallback((item) => {
    navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
      data: item,
    });
  }, []);

  const _handleTakeVoucher = useRequireLoginCallback(
    async (item: Voucher) => {
      dispatch(
        takeVoucher.request({
          partnerId: infoUser?._id,
          couponCode: item?.code,
        })
      );
    },
    [infoUser]
  );

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedSecondColor.value,
    };
  });

  function renderItem({ item }: RenderItemProps<Voucher>) {
    if (moment(item.expiredAt).isBefore(moment())) {
      return null;
    }
    return (
      <VoucherItem
        item={item}
        onDetails={handleViewDetails}
        onTakeVoucher={_handleTakeVoucher}
        animatedSecondColor={animatedSecondColor}
      />
    );
  }

  const { keyExtractor } = useItemExtractor<Voucher>((item) => item._id);

  return (
    <Animated.View style={[styles.container, animBG]}>
      <ModalFlashMsg
        bottom
        show={flashMsgPopup.visible}
        hide={flashMsgPopup.hide}
        data={"Lấy voucher thành công."}
      />

      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", "white"]}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={refreshData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    </Animated.View>
  );
};

export default ListVoucher;

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    // paddingHorizontal: _moderateScale(8),
    // paddingVertical: _moderateScale(4),
    // backgroundColor:BASE_COLOR,
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
    // height: _moderateScale(8 * 10),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 2),
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 60,
  },
});
