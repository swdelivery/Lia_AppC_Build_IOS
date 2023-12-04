import React, { ReactNode, useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image as RNImage,
  ImageProps,
  ImageSourcePropType,
  ImageLoadEventData,
  NativeSyntheticEvent,
} from "react-native";
import Fade from "@Components/Fade";

export interface Props extends Omit<ImageProps, "source"> {
  auto?: boolean;
  placeholder?: ImageSourcePropType;
  placeholderComponent?: ReactNode;
  onReady?: () => void;
  uri?: string;
}

const DEFAULT_SOURCE = require("../../Image/logo.png");

function Image({
  auto = false,
  placeholder,
  placeholderComponent,
  // source,
  style,
  onReady,
  uri,
  ...props
}: Props) {
  const containerStyle: any = useMemo(
    () => StyleSheet.flatten(style) || {},
    [style]
  );
  const [autoStyle, setAutoStyle] = useState<ViewStyle>({
    width: containerStyle.width,
    height: containerStyle.height,
  });
  const [isReady, setReady] = useState(false);

  const handleLoad = useCallback(
    (evt: NativeSyntheticEvent<ImageLoadEventData>) => {
      if (auto) {
        const { width, height } = evt.nativeEvent.source;
        const ratio = width / height;
        if (containerStyle.width) {
          // Auto height
          const newHeight = containerStyle.width / ratio;
          console.log({ newHeight });

          setAutoStyle({
            width: containerStyle.width,
            height: newHeight,
            // @ts-ignore
            flex: null,
          });
        } else if (containerStyle.height) {
          // Auto width
          const newWidth = containerStyle.height * ratio;
          setAutoStyle({
            height: containerStyle.height,
            width: newWidth,
            // @ts-ignore
            flex: null,
          });
        }
      }
      setReady(true);
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

  return (
    <View style={[styles.container, style, autoStyle]}>
      <RNImage
        // @ts-ignore
        source={normalisedSource}
        style={StyleSheet.absoluteFill}
        onLoad={handleLoad}
        {...props}
      />
      {!placeholderComponent && placeholder && !isReady && (
        <RNImage
          source={placeholder}
          style={styles.placeholder}
          resizeMode="contain"
          {...props}
        />
      )}

      {!!placeholderComponent && (
        <Fade visible={!isReady}>{placeholderComponent}</Fade>
      )}
    </View>
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
