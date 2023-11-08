import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { _heightScale, _moderateScale, _width } from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import IconBackWhite from "../../../SGV/backWhite.svg";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@Components/Icon";
import IconBackBlack from "../../../SGV/backArrBlack.svg";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";

type Props = {
  scrollY: SharedValue<number>;
  title: string;
};

const Header = ({ scrollY, title }: Props) => {
  const { top } = useSafeAreaInsets();

  const containerStyle = useMemo(() => {
    return { paddingTop: top + 8 };
  }, [top]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 200], [0, 1]);
    return {
      opacity: opacity,
    };
  });

  return (
    <View style={[styles.header, containerStyle]}>
      <Animated.View style={[styles.background, animatedStyle]} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={navigation.goBack}
        hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
      >
        <IconBackBlack width={24} height={24} />
      </TouchableOpacity>
      <Animated.View style={[styleElement.flex, animatedStyle]}>
        <Text color={"black"} size={16} weight="bold" left={8}>
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    width: _width,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  background: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 32,
    aspectRatio: 1,
    paddingRight: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
