import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { _heightScale, _moderateScale, _width } from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import IconBackWhite from "../../../SGV/backWhite.svg";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = (props) => {
  const { top } = useSafeAreaInsets();

  const containerStyle = useMemo(() => {
    return { marginTop: top };
  }, [top]);

  return (
    <Animated.View style={[styles.header, containerStyle]}>
      <TouchableOpacity
        onPress={navigation.goBack}
        hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
      >
        <IconBackWhite
          width={_moderateScale(8 * 4)}
          height={_moderateScale(8 * 4)}
        />
      </TouchableOpacity>
    </Animated.View>
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
    // borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
  },
});
