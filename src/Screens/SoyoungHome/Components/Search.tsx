import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import IconFind from "../../../SGV/find_grey.svg";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { BASE_COLOR, WHITE } from "../../../Constant/Color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@Components/Text";
import Row from "@Components/Row";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import { useNavigate } from "src/Hooks/useNavigation";
import SVGQRScaner from "src/SGV/qrScaner.svg";

const Search = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigate();

  const _handleQR = useRequireLoginCallback(() => {
    navigation.navigate(ScreenKey.QR_CODE);
  }, []);

  return (
    <Row style={styles.container} marginTop={top + 8} gap={8}>
      <Row style={[styles.search, shadow]} gap={8}>
        <TouchableOpacity
          onPress={navigate(ScreenKey.SEARCHING_HOME)}
          style={styles.search__input}
        >
          <IconFind width={8 * 2} height={8 * 2} />
          <Text size={13} color={"#454444"} left={8}>
            Nhập thông tin tìm kiếm
          </Text>
        </TouchableOpacity>
      </Row>

      <TouchableOpacity onPress={_handleQR} style={[styles.qrButton, shadow]}>
        <SVGQRScaner color={BASE_COLOR} />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: _width - _moderateScale(16) * 2,
  },
  search__input: {
    // width: _widthScale(250),
    flex: 1,
    width: "100%",
    height: 8 * 3.5,
    borderRadius: 8,
    backgroundColor: "#f0f1f2",
    alignItems: "center",
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  search_down_icon: {
    height: 8 * 3,
    width: 8 * 3,
    justifyContent: "center",
    alignItems: "center",
  },
  search__option: {
    height: 8 * 4,
    width: 8 * 5,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  qrButton: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 8,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 3,
};

export default Search;
