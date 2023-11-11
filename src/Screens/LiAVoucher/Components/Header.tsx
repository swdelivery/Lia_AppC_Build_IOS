import {
  ColorValue,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BASE_COLOR, WHITE } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import { IconBackWhite, IconVoucherGold } from "../../../Components/Icon/Icon";
import ScreenKey from "../../../Navigation/ScreenKey";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { sizeIcon } from "../../../Constant/Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spacer from "@Components/Spacer";
import { styleElement } from "@Constant/StyleElement";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import Column from "@Components/Column";
import StatusBarCustom from "@Components/StatusBar/StatusBarCustom";

type Props = {
  title: string;
  animatedPrimaryColor: SharedValue<string>;
};

const Header = ({ title, animatedPrimaryColor }: Props) => {
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate();

  const handleMyVoucher = useRequireLoginCallback(() => {
    navigation.navigate(ScreenKey.MY_VOUCHERS);
  }, []);

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedPrimaryColor.value,
    };
  });

  return (
    <Animated.View style={[styles.header, animBG]}>
      <Spacer top={top} />
      <StatusBar barStyle="light-content" />
      <View style={styles.header__box}>
        <View style={styleElement.flex}>
          <TouchableOpacity onPress={navigation.goBack}>
            <IconBackWhite style={sizeIcon.llg} />
          </TouchableOpacity>
        </View>
        <Column alignItems="center" flex={1}>
          <Text weight="bold" size={16} color={WHITE}>
            {title}
          </Text>
        </Column>
        <TouchableOpacity onPress={handleMyVoucher} style={styles.myVoucher}>
          <IconVoucherGold style={sizeIcon.md} />
          <Text weight="bold" color={WHITE}>
            Kho Voucher
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header__box: {
    height: _moderateScale(8 * 6),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  header: {
    backgroundColor: BASE_COLOR,
  },

  myVoucher: {
    flex: 1,

    alignItems: "center",
  },
});
