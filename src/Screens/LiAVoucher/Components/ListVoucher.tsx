import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { WHITE } from "../../../Constant/Color";
import { styleElement } from "../../../Constant/StyleElement";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ScreenKey from "../../../Navigation/ScreenKey";
import ModalFlashMsg from "../../../Components/ModalFlashMsg/ModalFlashMsg";
import {
  getListPublicVoucher,
  takeVoucher,
} from "../../../Redux/Action/VoucherAction";
import { useSelector } from "react-redux";
import VoucherItem from "./VoucherItem";
import { useNavigate } from "src/Hooks/useNavigation";
import { getInfoUserReducer } from "@Redux/Selectors";
import useVisible from "src/Hooks/useVisible";

type Props = {
  animatedSecondColor: SharedValue<string>;
};

const ListVoucher = ({ animatedSecondColor }: Props) => {
  const { navigation } = useNavigate();
  const { infoUser } = useSelector(getInfoUserReducer);

  const [listVoucher, setListVoucher] = useState([]);
  const flashMsgPopup = useVisible();

  useEffect(() => {
    _getListPublicVoucher();
  }, []);

  const _getListPublicVoucher = async () => {
    let result = await getListPublicVoucher();
    if (result?.isAxiosError) return;
    setListVoucher(result?.data?.data);
  };

  const handleViewDetails = useCallback(
    (item) => {
      navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
        data: item,
        _getListPublicVoucher,
      });
    },
    [_getListPublicVoucher]
  );

  const _handleTakeVoucher = useCallback(
    async (item) => {
      let result = await takeVoucher({
        partnerId: infoUser?._id,
        couponCode: item?.code,
      });
      if (result?.isAxiosError) return;

      _getListPublicVoucher();

      flashMsgPopup.show();
      setTimeout(() => {
        flashMsgPopup.hide();
      }, 500);
    },
    [infoUser, _getListPublicVoucher]
  );

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedSecondColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animBG]}>
      <ModalFlashMsg
        bottom
        show={flashMsgPopup.visible}
        hide={flashMsgPopup.hide}
        data={"Lấy voucher thành công."}
      />

      <LinearGradient
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", "white"]}
      />

      <ScrollView>
        {listVoucher?.map((item, index) => {
          return (
            <VoucherItem
              item={item}
              onDetails={handleViewDetails}
              onTakeVoucher={_handleTakeVoucher}
              animatedSecondColor={animatedSecondColor}
            />
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
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
});
