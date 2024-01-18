import Column from '@Components/Column'
import { IconBackBlue, IconFindGrey, IconLike } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import TextInput from "@Components/TextInput";
import { BLACK, BORDER_COLOR, TEXT_BASE, WHITE } from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import { _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { selectServiceSearching } from "@Redux/category/actions";
import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import useHapticCallback from "src/Hooks/useHapticCallback";
import { useNavigate } from "src/Hooks/useNavigation";

const Header = () => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const { navigation } = useNavigate();
  const textInputRef = useRef(null);
  const widthExpandInput = useSharedValue(0);
  const opacityExpandInput = useSharedValue(0);
  const opacityTitle = useSharedValue(1);
  const [isExpandTextInput, setIsExpandTextInput] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const _handleToggle = useHapticCallback(() => {
    if (isEmpty(valueSearch)) {
      setIsExpandTextInput((old) => !old);
    }
    dispatch(selectServiceSearching(valueSearch));
  }, [valueSearch]);

  useEffect(() => {
    if (isExpandTextInput) {
      textInputRef?.current?.focus();
      widthExpandInput.value = withTiming(100, { duration: 500 });
      opacityExpandInput.value = withTiming(1, { duration: 300 });
      opacityTitle.value = withTiming(0, { duration: 200 });
    } else {
      widthExpandInput.value = withTiming(0, { duration: 500 });
      opacityExpandInput.value = withTiming(0, { duration: 500 }, (isFns) => {
        if (isFns) {
          opacityTitle.value = withTiming(1, { duration: 200 });
        }
      });
    }
  }, [isExpandTextInput]);

  const animWidthExpandInput = useAnimatedStyle(() => {
    return {
      width: `${widthExpandInput.value}%`,
      opacity: opacityExpandInput.value,
    };
  });
  const animTitle = useAnimatedStyle(() => {
    return {
      opacity: opacityTitle.value,
    };
  });

  return (
    <View>
      <Column height={top} />
      <Row paddingTop={8} padding={8 * 2}>
        <Column width={24}>
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={styleElement.hitslopSm}
          >
            <IconBackBlue />
          </TouchableOpacity>
        </Column>
        <Row flex={1}>
          {!isExpandTextInput && (
            <Animated.View style={[styles.titleContainer, animTitle]}>
              <Text color={"#366792"} weight="bold" size={16}>
                Danh sách dịch vụ
              </Text>
            </Animated.View>
          )}
          {isExpandTextInput && (
            <Animated.View
              style={[styles.containerExpandInput, animWidthExpandInput]}
            >
              <IconFindGrey style={sizeIcon.lg} />
              <TextInput
                onChangeText={setValueSearch}
                value={valueSearch}
                style={[styleElement.flex, styles.input]}
                ref={textInputRef}
                onBlur={_handleToggle}
                placeholder="Nhập thông tin"
              />

              <Column
                marginRight={8}
                onPress={() => {
                  textInputRef?.current?.blur();
                }}
              >
                <Text>Tìm</Text>
              </Column>
            </Animated.View>
          )}
        </Row>

        {!isExpandTextInput && (
          <Row gap={8 * 2} width={24}>
            <TouchableOpacity
              hitSlop={styleElement.hitslopSm}
              onPress={_handleToggle}
            >
              <IconFindGrey style={sizeIcon.lg} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ opacity: 0 }}>
            <IconLike />
          </TouchableOpacity> */}
          </Row>
        )}
      </Row>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerExpandInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDER_COLOR,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  titleContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: BLACK,
  },
});
