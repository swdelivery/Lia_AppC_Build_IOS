import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Row from "@Components/Row";
import { BASE_COLOR, BORDER_COLOR, GREY, RED, WHITE } from "@Constant/Color";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";
import { stylesFont } from "@Constant/Font";
import { isEmpty } from "lodash";
import Column from "@Components/Column";
import Collapsible from "react-native-collapsible";
import TextInput from "@Components/TextInput";

type Props = {
  title: string;
  require?: boolean;
  icon?: any;
  enablePress?: boolean;
  onPress?: () => void;
  value?: any;
  onChangeText?: (item) => void;
  notEditable?: boolean;
  keyboardType?: any;
  error?: string;
  setError?: (item) => void;
  maxLength?: number;
  children?: ReactNode;
};

const Input = ({
  title,
  require,
  icon,
  enablePress,
  onPress,
  value,
  onChangeText,
  notEditable,
  keyboardType = "default",
  error,
  children,
  setError,
  maxLength = null,
}: Props) => {
  const [onFocused, setOnFocused] = useState(false);
  const RefInput = useRef(null);
  const positionY = useSharedValue(0);

  useEffect(() => {
    if (onFocused || value) {
      positionY.value = withTiming(-30, { duration: 300 });
    } else {
      if (isEmpty(value)) {
        positionY.value = withTiming(0, { duration: 300 });
      }
    }
  }, [onFocused, value]);

  useEffect(() => {
    if (enablePress && !isEmpty(value)) {
      positionY.value = withTiming(-30, { duration: 300 });
    }
  }, [value]);

  const animText = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
    };
  });

  const _handleOnfocusInput = () => {
    setOnFocused(true);
  };
  const _handleOnBlurInput = () => {
    if (!isEmpty(value) && keyboardType == "email-address") {
      validateEmail(value);
    }
    if (require) {
      if (isEmpty(value)) {
        setError("Vui lòng nhập đầy đủ");
      } else {
        setError(null);
      }
    }

    setOnFocused(false);
  };

  const validateEmail = (value) => {
    // Biểu thức chính quy để kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      // Email hợp lệ
      setError(null);
    } else {
      // Email không hợp lệ
      setError("Vui lòng nhập địa chỉ email hợp lệ");
    }
  };

  if (enablePress) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={[styles.container]}
      >
        <Animated.View style={[styles.textTitle, animText]}>
          <Text color={GREY} size={_moderateScale(14)}>
            {title} {require && <Text color={RED}>*</Text>}
          </Text>
        </Animated.View>

        <Row paddingLeft={8 * 6} gap={8 * 2}>
          <View style={styles.icon}>{icon}</View>
          <Column
            paddingHorizontal={_moderateScale(4)}
            justifyContent="center"
            height={_moderateScale(8 * 7)}
          >
            <Text size={_moderateScale(14)}>{value}</Text>
          </Column>
        </Row>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          onFocused && { borderWidth: 1, borderColor: BASE_COLOR },
          error && { borderColor: RED },
        ]}
      >
        <Animated.View style={[styles.textTitle, animText]}>
          <Text
            weight={onFocused ? "bold" : "regular"}
            color={onFocused ? BASE_COLOR : GREY}
            size={_moderateScale(14)}
          >
            {title} {require && <Text color={RED}>*</Text>}
          </Text>
        </Animated.View>
        <Row paddingLeft={8 * 6} gap={8 * 2}>
          <View style={styles.icon}>{icon}</View>
          <TextInput
            maxLength={maxLength ? maxLength : null}
            selectTextOnFocus
            editable={notEditable ? false : true}
            value={value}
            onChangeText={(e) => onChangeText(e)}
            ref={RefInput}
            onFocus={_handleOnfocusInput}
            onBlur={_handleOnBlurInput}
            keyboardType={keyboardType}
            style={[styles.textInput, notEditable && { color: GREY }]}
          />
        </Row>

        <Collapsible collapsed={error ? false : true}>
          <Column margin={8 * 2} marginTop={0}>
            <Text color={RED} fontStyle="italic">
              * {error}
            </Text>
          </Column>
        </Collapsible>
        {children}
      </View>
    );
  }
};

export default Input;

const styles = StyleSheet.create({
  textTitle: {
    position: "absolute",
    top: _moderateScale(8 * 2),
    left: _moderateScale(8 * 6),
    backgroundColor: WHITE,
    paddingHorizontal: _moderateScale(4),
  },
  textInput: {
    flex: 1,
    height: _moderateScale(8 * 7),
    paddingHorizontal: _moderateScale(4),
    ...stylesFont.fontNolan,
    fontSize: _moderateScale(14),
  },
  icon: {
    position: "absolute",
    left: _moderateScale(8 * 2),
  },
  container: {
    // height: _moderateScale(8 * 7),
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
});
