import React, { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import { ConfigFileCode } from "@typings/configFile";
import { first } from "lodash";
import Column from "@Components/Column";
import { useDispatch, useSelector } from "react-redux";
import { getImageVoucherHome } from "@Redux/imageVoucher/actions";
import { getImageVoucherHomeState } from "@Redux/imageVoucher/selectors";
import CachedImageView from "@Components/CachedImage";

const Voucher = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { data } = useSelector(getImageVoucherHomeState);

  useEffect(() => {
    dispatch(getImageVoucherHome.request(ConfigFileCode.ImageVoucherHome));
  }, []);

  const voucher = useMemo(() => {
    if (!data) {
      return null;
    }
    return first(data.fileArr);
  }, [data]);

  if (!voucher) {
    return null;
  }

  return (
    <Column alignItems="center" onPress={navigate(ScreenKey.LIA_VOUCHER)}>
      <CachedImageView auto avatar={voucher} style={styles.image} />
    </Column>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  image: {
    width: _width - _moderateScale(16) * 2,
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
});
