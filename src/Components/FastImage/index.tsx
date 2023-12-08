import FastImage, {
  FastImageProps,
  OnLoadEvent,
  Source,
} from "react-native-fast-image";
import React, { ReactNode, useState, useCallback, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export type { Source };
export interface ImageProps extends FastImageProps {
  auto?: boolean;
  placeholderComponent?: ReactNode;
  onReady?: () => void;
  uri?: string;
}

function Image({
  auto = false,
  placeholderComponent,
  // source,
  style,
  onReady,
  uri,
  ...props
}: ImageProps) {
  const containerStyle: any = useMemo(
    () => StyleSheet.flatten(style) || {},
    [style]
  );
  const autoStyle = useSharedValue<ViewStyle>({
    width: containerStyle.width,
    height: containerStyle.height,
  });
  const isReady = useSharedValue(0);

  const handleLoad = useCallback(
    (evt: OnLoadEvent) => {
      if (auto) {
        const { width, height } = evt.nativeEvent;
        const ratio = width / height;
        if (containerStyle.width) {
          // Auto height
          const newHeight = containerStyle.width / ratio;
          autoStyle.value = {
            width: containerStyle.width,
            height: newHeight,
            // @ts-ignore
            flex: null,
          };
        } else if (containerStyle.height) {
          // Auto width
          const newWidth = containerStyle.height * ratio;
          autoStyle.value = {
            height: containerStyle.height,
            width: newWidth,
            // @ts-ignore
            flex: null,
          };
        }
      }
      isReady.value = withTiming(1, { duration: 700 });
      if (onReady) {
        onReady();
      }
    },
    [auto, containerStyle, onReady]
  );

  const normalisedSource = useMemo(
    () =>
      typeof uri === "string" &&
      // @ts-ignore
      (!uri.includes("/") || !uri.includes("."))
        ? null
        : { uri },
    [uri]
  );
  const mAutoStyle = useAnimatedStyle(() => {
    return autoStyle.value;
  }, []);

  const imageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(isReady.value, [0, 1], [0, 1], "clamp"),
    };
  }, []);

  return (
    <Animated.View style={[styles.container, style, mAutoStyle]}>
      {placeholderComponent}
      <Animated.View style={[styles.placeholder, imageContainerStyle]}>
        <FastImage
          // @ts-ignore
          source={normalisedSource}
          style={StyleSheet.absoluteFill}
          onLoad={handleLoad}
          {...props}
        />
      </Animated.View>
    </Animated.View>
  );
}

export default React.memo(Image);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    margin: 0,
  },
});
