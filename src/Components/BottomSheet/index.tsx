import { styleElement } from "@Constant/StyleElement";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IconCancelGrey } from "../../Components/Icon/Icon";
import {
  BASE_COLOR,
  BORDER_COLOR,
  BORDER_INPUT_TEXT,
  ERROR_COLOR,
  WHITE,
} from "../../Constant/Color";
import { sizeIcon } from "../../Constant/Icon";
import { _height, _moderateScale, _width } from "../../Constant/Scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Column from "@Components/Column";
import IconButton from "@Components/IconButton";
import {
  BottomSheetContext,
  useBottomSheetContext,
} from "./useBottomSheetContext";

type Props = {
  visible?: boolean;
  onClose?: () => void;
  animatedVisible?: SharedValue<boolean>;
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  hideNavigator?: boolean;
};

const BottomSheet = ({
  visible,
  onClose,
  children,
  contentContainerStyle,
  hideNavigator = false,
}: Props) => {
  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);
  const contentHeight = useRef(0);
  const { bottom } = useSafeAreaInsets();
  const currentCallback = useRef<any>();

  useEffect(() => {
    if (visible) {
      expand();
    } else {
    }
  }, [visible]);

  const animTranY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tranYModal.value }],
    };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value };
  });

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (currentCallback.current) {
      currentCallback.current();
    }
  }, [onClose]);

  const expand = useCallback(() => {
    tranYModal.value = withSpring(0, {
      overshootClamping: true,
    });
    opacityBackDrop.value = withTiming(1, { duration: 300 });
  }, []);

  const collapse = useCallback(() => {
    tranYModal.value = withSpring(
      contentHeight.current,
      {
        overshootClamping: true,
      },
      (fnd) => {
        if (fnd) {
          runOnJS(handleClose)();
        }
      }
    );
    opacityBackDrop.value = withTiming(0, { duration: 300 });
  }, [handleClose]);

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) => {
      contentHeight.current = height;
      tranYModal.value = height;
      expand();
    },
    []
  );

  const closeWithCallback = useCallback(
    (callback?: any) => () => {
      currentCallback.current = callback;
      collapse();
    },
    [collapse]
  );

  const context = useMemo(
    () => ({
      close: closeWithCallback,
    }),
    [closeWithCallback]
  );

  if (!visible) {
    return null;
  }

  return (
    <BottomSheetContext.Provider value={context}>
      <View style={styles.container}>
        <Animated.View style={[styles.bg, animOpacityBackDrop]}>
          <TouchableOpacity
            onPress={collapse}
            style={[StyleSheet.absoluteFillObject]}
          />
        </Animated.View>

        <Animated.View
          style={[styles.mainModal, contentContainerStyle, animTranY]}
          onLayout={handleLayout}
        >
          <Column marginBottom={bottom}>
            {!hideNavigator && (
              <Row height={30} justifyContent="center">
                <View style={styles.indicator} />
                <IconButton
                  hitSlop={styleElement.hitslopSm}
                  onPress={collapse}
                  containerStyle={styles.cancelBtn}
                  size={30}
                >
                  <IconCancelGrey style={sizeIcon.xxs} />
                </IconButton>
              </Row>
            )}
            {children}
          </Column>
        </Animated.View>
      </View>
    </BottomSheetContext.Provider>
  );
};

function MenuItem({
  icon,
  title,
  onPress,
  type = "positive",
  center = false,
  triggerAfterAnimation = false,
}: {
  icon?: ReactNode;
  title: string;
  onPress?: () => void;
  type?: "negative" | "positive";
  center?: boolean;
  triggerAfterAnimation?: boolean;
}) {
  const { close } = useBottomSheetContext();

  const handlePress = useCallback(() => {
    if (triggerAfterAnimation) {
      close(onPress)();
    } else {
      close()();
      if (onPress) {
        onPress();
      }
    }
  }, [triggerAfterAnimation, onPress, close]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      alignItems: center ? "center" : "flex-start",
      borderBottomWidth: type === "positive" ? 1 : 0,
    };
  }, [center, type]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.itemContainer, containerStyle]}
    >
      <Row>
        {icon}
        <Text
          weight="bold"
          color={type === "positive" ? BASE_COLOR : ERROR_COLOR}
        >
          {title}
        </Text>
      </Row>
    </Pressable>
  );
}

BottomSheet.MenuItem = MenuItem;

export default BottomSheet;

const styles = StyleSheet.create({
  cancelBtn: {
    position: "absolute",
    right: 16,
  },
  option: {
    height: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: _moderateScale(8 * 3),
  },
  mainModal: {
    width: _width,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: _moderateScale(8 * 2),
    position: "absolute",
    bottom: 0,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  bg: {
    width: _width,
    height: _height,
    backgroundColor: "rgba(0,0,0,.7)",
  },
  indicator: {
    width: 120,
    height: 3,
    borderRadius: 2,
    backgroundColor: BORDER_INPUT_TEXT,
  },
  itemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
