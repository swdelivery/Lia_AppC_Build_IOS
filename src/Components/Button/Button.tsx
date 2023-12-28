import React, { ReactNode, useMemo } from "react";
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
  disabled?: boolean;
  onPress: () => void;
  title?: string;
  titleSize?: number;
  titleColor?: ColorValue;
  backgroundColor?: ColorValue;
  height?: number;
  width?: number;
  flex?: number;
  borderRadius?: number;
  marginHorizontal?: number;
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
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
  colorText?: any;
};

type GradientProps = {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  horizontal?: boolean;
};

type OutlineProps = {
  borderColor?: ColorValue;
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
  colorText,
}: CustomProps) => {
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
          containerStyle,
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            {
              color: colorText ? colorText : "#fff",
              fontSize: titleSize ? titleSize : _moderateScale(18),
            },
            styleText,
          ]}
        >
          {title ? title : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
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
          props?.style,
        ]}
      >
        <Text
          style={[
            stylesFont.fontNolanBold,
            { color: "#fff", fontSize: _moderateScale(18) },
            props?.styleText,
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

const Base = ({
  disabled,
  title,
  titleColor,
  titleSize,
  height = 48,
  width,
  backgroundColor = Color.BASE_COLOR,
  containerStyle,
  flex,
  marginHorizontal,
  onPress,
  children,
  borderRadius = 8,
}: Props) => {
  const handlePress = useDebounceCallback(onPress, [onPress]);

  const mContainerStyle = useMemo(() => {
    return {
      height,
      width,
      backgroundColor,
      flex,
      marginHorizontal,
      opacity: disabled ? 0.5 : 1,
      borderRadius,
    };
  }, [
    height,
    backgroundColor,
    width,
    flex,
    marginHorizontal,
    disabled,
    borderRadius,
  ]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonContainer, mContainerStyle, containerStyle]}
      onPress={handlePress}
    >
      {children}
      {!!title && (
        <Text color={titleColor} size={titleSize} weight="bold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const Outline = ({
  borderColor = Color.BORDER_COLOR,
  containerStyle,
  ...props
}: Props & OutlineProps) => {
  const mContainerStyle = useMemo(() => {
    return {
      borderColor,
      borderWidth: 1,
      backgroundColor: Color.WHITE,
    };
  }, [borderColor]);

  return <Base containerStyle={[containerStyle, mContainerStyle]} {...props} />;
};

const Gradient = ({
  colors = [Color.BASE_COLOR, Color.NEW_BASE_COLOR],
  horizontal = false,
  titleColor = "white",
  ...props
}: Props & GradientProps) => {
  return (
    <Base {...props} titleColor={titleColor}>
      <LinearGradient
        start={horizontal ? { x: 0, y: 1 } : { x: 1, y: 0 }}
        end={horizontal ? { x: 1, y: 1 } : { x: 1, y: 1 }}
        colors={colors}
        style={styles.gradient}
      ></LinearGradient>
    </Base>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
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
    ...StyleSheet.absoluteFillObject,
  },
});

const Button = {
  ButtonPrimary,
  ButtonOutline,
  Gradient,
  Outline,
  Custom,
};
export default Button;
