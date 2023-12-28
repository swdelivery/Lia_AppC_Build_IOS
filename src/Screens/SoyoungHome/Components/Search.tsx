import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import IconFind from "../../../SGV/find_grey.svg";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { useSelector } from "react-redux";
import ModalPickSingleNotSearch from "../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch";
import { sizeIcon } from "../../../Constant/Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@Components/Text";
import Row from "@Components/Row";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import { getServiceGroupState } from "@Redux/home/selectors";
import SVGArrowDown from "src/SGV/arrowDown.svg";
import { useNavigate } from "src/Hooks/useNavigation";
import SVGQRScaner from "src/SGV/qrScaner.svg";

const Search = (props) => {
  const { top } = useSafeAreaInsets();
  const { data } = useSelector(getServiceGroupState);
  const { navigate } = useNavigate();

  const heightExpandServiceGr = useSharedValue(0);

  const [expandServiceGr, setExpandServiceGr] = useState(false);

  useEffect(() => {
    if (expandServiceGr) {
      heightExpandServiceGr.value = withTiming(_heightScale(300), {
        duration: 300,
      });
    } else {
      heightExpandServiceGr.value = withTiming(0, { duration: 300 });
    }
  }, [expandServiceGr]);

  const animHeightExpandServiceGr = useAnimatedStyle(() => {
    return {
      height: heightExpandServiceGr.value,
    };
  });

  const containerStyle = useMemo(() => {
    return {
      marginTop: top + 8,
    };
  }, [top]);

  const _handleQR = useRequireLoginCallback(() => {
    navigation.navigate(ScreenKey.QR_CODE);
  }, []);

  return (
    <Row style={[styles.container, containerStyle]} gap={8}>
      <Row style={[styles.search, shadow]} gap={8}>
        <ModalPickSingleNotSearch
          hide={() => {
            setExpandServiceGr(false);
          }}
          onSelect={(item) => {
            navigation.navigate(ScreenKey.SEARCHING_HOME, {
              keySearch: item?.name,
            });
          }}
          data={data?.length > 0 ? data : []}
          show={expandServiceGr}
        />
        <TouchableOpacity
          onPress={() => {
            setExpandServiceGr((old) => !old);
          }}
        >
          <Row style={styles.search__option} gap={8} marginHorizontal={8}>
            <Text size={12} style={stylesFont.fontNolan500}>
              Mắt
            </Text>
            <SVGArrowDown width={16} height={16} />
          </Row>
        </TouchableOpacity>
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
        <SVGQRScaner style={sizeIcon.lg} />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: _width - _moderateScale(20) * 2,
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
