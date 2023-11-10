import { StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { BASE_COLOR, BG_SERVICE, WHITE } from "../../Constant/Color";
import LiAHeader from "../../Components/Header/LiAHeader";
import HorizontalBanner from "./Components/HorizontalBanner";
import HorizontalTab from "./Components/HorizontalTab";
import ListVoucher from "./Components/ListVoucher";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Header from "./Components/Header";

const LiAVoucher = () => {
  const preColor = useSharedValue("#000");
  const primaryColor = useSharedValue(BG_SERVICE);

  const preSecondColor = useSharedValue("#000");
  const secondColor = useSharedValue(BG_SERVICE);
  // const secondColor = useSharedValue();

  const flagIndexHasChanged = useSharedValue(0);
  const flagSecondIndexHasChanged = useSharedValue(0);
  const [time, setTime] = useState(0);
  const [isDragingBanner, setIsDragingBanner] = useState(false);
  const [interval, setInterval] = useState(null);

  const animatedPrimaryColor = useDerivedValue(() => {
    return interpolateColor(
      flagIndexHasChanged.value,
      [0, 1],
      [preColor.value, primaryColor.value]
    );
  }, []);

  const animatedSecondColor = useDerivedValue(() => {
    return interpolateColor(
      flagSecondIndexHasChanged.value,
      [0, 1],
      [preSecondColor.value, secondColor.value]
    );
  }, []);

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedPrimaryColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animBG]}>
      <Header
        animatedPrimaryColor={animatedPrimaryColor}
        title={"LIA VOUCHER"}
      />

      <HorizontalBanner
        primaryColor={primaryColor}
        flagIndexHasChanged={flagIndexHasChanged}
        flagSecondIndexHasChanged={flagSecondIndexHasChanged}
        preColor={preColor}
        preSecondColor={preSecondColor}
        secondColor={secondColor}
      />

      <HorizontalTab
        animatedPrimaryColor={animatedPrimaryColor}
        animatedSecondColor={animatedSecondColor}
      />

      <ListVoucher animatedSecondColor={animatedSecondColor} />
    </Animated.View>
  );
};

export default LiAVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLOR,
  },
});
