import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import useConfigFile from "src/Hooks/useConfigFile";
import { ConfigFileCode } from "@typings/configFile";
import { first } from "lodash";
import Image from "@Components/Image";
import Fade from "@Components/Fade";

const Voucher = () => {
  const { navigate } = useNavigate();
  const data = useConfigFile(ConfigFileCode.ImageVoucherHome);

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
    <Fade visible={!!voucher} initialScale={1}>
      <TouchableOpacity
        onPress={navigate(ScreenKey.LIA_VOUCHER)}
        style={{ alignSelf: "center" }}
      >
        <Image auto avatar={voucher} style={styles.image} />
      </TouchableOpacity>
    </Fade>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  image: {
    width: _widthScale(350),
    borderRadius: _moderateScale(8),
  },
});
