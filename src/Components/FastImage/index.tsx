import FastImage, {
  FastImageProps,
  OnLoadEvent,
  Source,
} from 'react-native-fast-image';
import React, {ReactNode, useState, useCallback, useMemo} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export type {Source};
export interface ImageProps extends FastImageProps {
  auto?: boolean;
  placeholder?: Source | number;
  placeholderComponent?: ReactNode;
  onReady?: () => void;
  uri: string;
}

const DEFAULT_SOURCE = require('../../Image/logo.png');

function Image({
  auto = false,
  placeholder = DEFAULT_SOURCE,
  placeholderComponent,
  // source,
  style,
  onReady,
  uri,
  ...props
}: ImageProps) {
  const containerStyle: any = useMemo(
    () => StyleSheet.flatten(style) || {},
    [style],
  );
  const [autoStyle, setAutoStyle] = useState<ViewStyle>({
    width: containerStyle.width,
    height: containerStyle.height,
  });
  const [isReady, setReady] = useState(false);

  const handleLoad = useCallback(
    (evt: OnLoadEvent) => {
      if (auto) {
        const {width, height} = evt.nativeEvent;
        const ratio = width / height;
        if (containerStyle.width) {
          // Auto height
          const newHeight = containerStyle.width / ratio;
          console.log({newHeight});

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
    [auto, containerStyle, onReady],
  );

  const normalisedSource = useMemo(
    () =>
      typeof uri === 'string' &&
      // @ts-ignore
      (!uri.includes('/') || !uri.includes('.'))
        ? null
        : {uri},
    [uri],
  );

  return (
    <View style={[styles.container, style, autoStyle]}>
      <FastImage
        // @ts-ignore
        source={normalisedSource}
        style={StyleSheet.absoluteFill}
        onLoad={handleLoad}
        {...props}
      />
      {!placeholderComponent && placeholder && !isReady && (
        <FastImage
          source={placeholder}
          style={styles.placeholder}
          resizeMode="contain"
          {...props}
        />
      )}

      {!isReady && placeholderComponent}
    </View>
  );
}

export default React.memo(Image);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    margin: 0,
  },
});
