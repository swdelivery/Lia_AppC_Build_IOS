import React, { useMemo } from "react";
import {
  StyleSheet,
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
import Text from "@Components/Text";
import Column from "@Components/Column";

type Props = {
  onPress: () => void;
  title: string;
  titleSize?: number;
  titleColor?: ColorValue;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

type CustomProps = {
  title?: string;
  titleSize?: number;
  onPress: () => void;
  disabled?: boolean;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
  bgColor?: any;
  colorText?: any
}

type GradientProps = {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

const Custom = ({
  title,
  titleSize = 16,
  onPress,
  disabled,
  height,
  containerStyle,
  styleText,
  bgColor,
  colorText }: CustomProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress ? () => onPress() : null}
    >
      <View
        style={[
          styles.customButton,
          { height: height ? height : _moderateScale(48) },
          disabled && { opacity: 0.5 },
          { backgroundColor: bgColor && bgColor },
          containerStyle
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { color: colorText ? colorText : "#fff", fontSize: titleSize ? titleSize : _moderateScale(18) },
            styleText
          ]}
        >
          {title ? title : ""}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

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
          props?.style
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { color: "#fff", fontSize: _moderateScale(18) },
            props?.styleText
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
      <Column
        style={styles.buttonOutline}
        height={props.height ? props.height : _moderateScale(48)}
      >
        <Text weight="bold" color={Color.BASE_COLOR} size={_moderateScale(18)}>
          {props.text ? props.text : ""}
        </Text>
      </Column>
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
  colors = [Color.BASE_COLOR, "#8c104e", "#db0505"],
  start = { x: 0, y: 1 },
  end = { x: 1, y: 1 },
}: Props & GradientProps) => {
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
        start={start}
        end={end}
        colors={colors}
        style={styles.gradient}
      >
        <Text weight={"bold"} style={[stylesFont.fontNolanBold, titleStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: "100%",
    backgroundColor: Color.BASE_COLOR,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
  },
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

const Button = { ButtonPrimary, ButtonOutline, Gradient, Custom };
export default Button;
