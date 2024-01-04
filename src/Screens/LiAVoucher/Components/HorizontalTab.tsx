import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { BASE_COLOR, WHITE } from "../../../Constant/Color";
import { IconVoucher } from "../../../Components/Icon/Icon";
import { styleElement } from "../../../Constant/StyleElement";
import { sizeIcon } from "../../../Constant/Icon";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ScreenKey from "../../../Navigation/ScreenKey";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";

type Props = {
  animatedPrimaryColor: SharedValue<string>;
  animatedSecondColor: SharedValue<string>;
};

const HorizontalTab = ({
  animatedPrimaryColor,
  animatedSecondColor,
}: Props) => {
  const { navigation } = useNavigate();

  const handleLuckyWheelPress = useRequireLoginCallback(() => {
    navigation.navigate(ScreenKey.WHEEL_SPIN);
  }, []);

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedPrimaryColor.value,
    };
  });

  const animActiveBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedSecondColor.value,
    };
  });

  return (
    <View style={styles.tab}>
      <Animated.View
        style={[
          styles.tab__child,
          {
            backgroundColor: "#AF7169",
            ...styleElement.centerChild,
            borderTopRightRadius: 16,
          },
          animActiveBG,
        ]}
      >
        <IconVoucher style={sizeIcon.lg} />
        <Text size={12} weight="bold" color={WHITE}>
          LiA Voucher
        </Text>
      </Animated.View>
      <Animated.View style={[styles.tab__child, animBG]}>
        <TouchableOpacity
          onPress={handleLuckyWheelPress}
          style={{ alignItems: "center" }}
        >
          <IconVoucher style={sizeIcon.lg} />
          <Text size={12} weight="bold" color={WHITE}>
            Vòng quay LiA
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.tab__child, animBG]}>
        <IconVoucher style={sizeIcon.lg} />
        <Text size={12} weight="bold" color={WHITE}>
          Điểm danh
        </Text>
      </Animated.View>

      <Animated.View style={[styles.tab__child, animBG]}>
        <IconVoucher style={sizeIcon.lg} />
        <Text size={12} weight="bold" color={WHITE}>
          Vũ điệu LiA
        </Text>
      </Animated.View>
    </View>
  );
};

export default HorizontalTab;

const styles = StyleSheet.create({
  tab__child: {
    flex: 1,
    backgroundColor: BASE_COLOR,
    ...styleElement.centerChild,
  },
  tab: {
    height: _moderateScale(8 * 7),
    flexDirection: "row",
    top: 1
  },
});
