import { styleElement } from "@Constant/StyleElement";
import React, { ReactNode, useCallback, useEffect } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconCancelGrey } from "../../Components/Icon/Icon";
import { BORDER_COLOR, WHITE } from "../../Constant/Color";
import { sizeIcon } from "../../Constant/Icon";
import { _height, _moderateScale, _width } from "../../Constant/Scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Row from "@Components/Row";
import Text from "@Components/Text";

type Props = {
  visible?: boolean;
  onClose?: () => void;
  animatedVisible?: SharedValue<boolean>;
  children: ReactNode;
};

const BottomSheet = ({ visible, onClose, children }: Props) => {
  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      tranYModal.value = withTiming(-contentHeight.value, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [visible]);

  const animTranY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tranYModal.value }],
      height: contentHeight.value,
      paddingBottom: bottom,
    };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value };
  });

  const handleHideModal = useCallback(() => {
    tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) {
        runOnJS(onClose)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  }, []);

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) => {
      contentHeight.value = height;
    },
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bg, animOpacityBackDrop]}>
        <TouchableOpacity
          onPress={handleHideModal}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>

      <Animated.View style={[styles.mainModal, animTranY]}>
        <View onLayout={handleLayout}>
          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={handleHideModal}
            style={styles.cancelBtn}
          >
            <IconCancelGrey style={sizeIcon.sm} />
          </TouchableOpacity>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

function MenuItem({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <Row>
      {icon}
      <Text>{title}</Text>
    </Row>
  );
}

BottomSheet.MenuItem = MenuItem;

export default BottomSheet;

const styles = StyleSheet.create({
  cancelBtn: {
    position: "absolute",
    right: _moderateScale(8 * 3),
    zIndex: 100,
    top: _moderateScale(8 * 2),
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
  },
  container: {
    width: _width,
    height: _height,
    position: "absolute",
    zIndex: 100,
    bottom: 0,
  },
  bg: {
    width: _width,
    height: _height,
    backgroundColor: "rgba(0,0,0,.7)",
  },
});
