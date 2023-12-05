import React, { memo, useMemo } from "react";
import {
  StatusBar,
  Platform,
  View,
  ColorValue,
  StatusBarProps,
  StyleSheet,
} from "react-native";
import { BASE_COLOR } from "../../Constant/Color";
import { _heightScale } from "../../Constant/Scale";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = StatusBarProps & {
  bgColor?: ColorValue;
  rmStatusBarHeight?: boolean;
  gradient?: boolean;
};

const StatusBarCustom = ({
  bgColor,
  barStyle,
  rmStatusBarHeight,
  gradient,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const containerStyle = useMemo(() => {
    return {
      height: top,
      backgroundColor: bgColor || BASE_COLOR,
    };
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={bgColor || BASE_COLOR}
        translucent
        barStyle={barStyle || "light-content"}
      />
      {!rmStatusBarHeight && Platform.OS == "ios" && (
        <View style={containerStyle}>
          {gradient ? (
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.6, 1]}
              colors={[BASE_COLOR, "#8c104e", "#db0505"]}
              style={styles.gradient}
            />
          ) : (
            <></>
          )}
        </View>
      )}
    </>
  );
};

export default StatusBarCustom;

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    // borderRadius: _moderateScale(8),
  },
});
