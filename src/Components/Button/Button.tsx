import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ColorValue,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import useDebounceCallback from "../../Hooks/useDebounceCallback";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  onPress: () => void;
  title: string;
  titleSize?: number;
  titleColor?: ColorValue;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const ButtonPrimary = (props) => {
  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={props.pressAction ? () => props.pressAction() : null}
    >
      <View
        style={[
          styles.button,
          { height: props.height ? props.height : _moderateScale(48) },
          props?.disabled && { opacity: 0.5 },
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { color: "#fff", fontSize: _moderateScale(18) },
          ]}
        >
          {props.text ? props.text : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ButtonOutline = (props) => {
  return (
    <TouchableOpacity
      onPress={props.pressAction ? () => props.pressAction() : null}
    >
      <View
        style={[
          styles.buttonOutline,
          { height: props.height ? props.height : _moderateScale(48) },
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { color: Color.BASE_COLOR, fontSize: _moderateScale(18) },
          ]}
        >
          {props.text ? props.text : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Gradient = ({
  onPress,
  title,
  titleSize = 16,
  titleColor = Color.WHITE,
  height = 48,
  containerStyle,
}: Props) => {
  const handlePress = useDebounceCallback(onPress);

  const titleStyle = useMemo(() => {
    return {
      fontSize: titleSize,
      color: titleColor,
    };
  }, [titleSize, titleColor]);

  const mContainerStyle = useMemo(() => {
    return {
      height,
    };
  }, [height]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.gradientContainer, mContainerStyle, containerStyle]}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.6, 1]}
        colors={[Color.BASE_COLOR, "#8c104e", "#db0505"]}
        style={styles.gradient}
      >
        <Text style={[stylesFont.fontNolanBold, titleStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Color.BASE_COLOR,
    borderRadius: _moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.BASE_COLOR,
  },
  buttonOutline: {
    width: "100%",
    backgroundColor: Color.WHITE,
    borderRadius: _moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.BASE_COLOR,
  },
  gradientContainer: {
    height: _moderateScale(8 * 6),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.SECOND_COLOR,
    flex: 1,
  },
});

const Button = { ButtonPrimary, ButtonOutline, Gradient };
export default Button;
