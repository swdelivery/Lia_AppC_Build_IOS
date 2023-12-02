import { IconAIWhite, IconBackWhite } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "src/Hooks/useNavigation";
import * as Color from "../../../../Constant/Color";
import {
  _moderateScale,
  _width
} from "../../../../Constant/Scale";
import { styleElement } from "../../../../Constant/StyleElement";


const Header = () => {
  const { navigation } = useNavigate();
  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Row
        style={styles.header}
        paddingTop={top + 8}
        paddingBottom={8}
        paddingHorizontal={16}
      >
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={navigation.goBack}
        >
          <IconBackWhite />
        </TouchableOpacity>
        <Row gap={8 * 2} paddingLeft={8 * 2}>
          <IconAIWhite />
          <Text
            color={Color.WHITE}
            weight="bold"
            numberOfLines={1}
            size={16}>
            Trợ lý  AI LiA
          </Text>
        </Row>
      </Row>
    </>
  );
};


const styles = StyleSheet.create({
  header: {
    width: _width,
    backgroundColor: Color.BASE_COLOR,
    zIndex: 1,
    borderBottomWidth: _moderateScale(0.5),
    borderBottomColor: Color.BG_GREY_OPACITY_5,
  },
  avatar: {
    width: _moderateScale(40),
    height: _moderateScale(40),
    borderRadius: _moderateScale(20),
    // borderColor: Color.BG_GREY_OPACITY
  },
  dot: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    marginRight: _moderateScale(4),
    top: _moderateScale(1),
  },
  icon: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
    borderColor: Color.BG_GREY_OPACITY,
  },
  roomInfo: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Header;
