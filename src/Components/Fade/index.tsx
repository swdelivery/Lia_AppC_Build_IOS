/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import React, { useEffect, useCallback, useRef } from 'react';
import Animated, {
  runOnJS,
  Keyframe,
  useSharedValue,
} from 'react-native-reanimated';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

type Props = ViewProps & {
  visible: boolean;
  placeholder?: any;
  style?: StyleProp<ViewStyle>;
  children?: any;
  duration?: number;
  initialScale?: number;
  onHidden?: () => void;
};

function Fade({
  visible,
  placeholder = null,
  style,
  children,
  duration = 300,
  initialScale = 0.8,
  onHidden = () => null,
  ...rest
}: Props) {
  const onHiddenRef = useRef<any>();
  const animatedVisible = useSharedValue(visible);

  useEffect(() => {
    animatedVisible.value = visible;
  }, [visible]);

  useEffect(() => {
    onHiddenRef.current = onHidden;
  }, [onHidden]);

  const handleClose = useCallback(() => {
    if (!animatedVisible.value) {
      onHiddenRef.current();
    }
  }, []);

  const entering = new Keyframe({
    0: {
      opacity: 0.3,
      transform: [
        {
          scale: initialScale,
        },
      ],
    },
    100: {
      opacity: 1,
      transform: [
        {
          scale: 1,
        },
      ],
    },
  }).duration(duration);

  const exiting = new Keyframe({
    0: {
      opacity: 1,
      transform: [
        {
          scale: 1,
        },
      ],
    },
    100: {
      opacity: 0.3,
      transform: [
        {
          scale: initialScale,
        },
      ],
    },
  })
    .duration(duration)
    .withCallback((finished: boolean) => {
      'worklet';

      if (finished) {
        runOnJS(handleClose)();
      }
    });
  // return children
  return (
    <>
      {visible && (
        <Animated.View
          style={style}
          // entering={entering}
          // exiting={exiting}
          {...rest}
        >
          {children}
        </Animated.View>
      )}

      {!visible && placeholder && (
        <View style={StyleSheet.absoluteFill}>{placeholder}</View>
      )}
    </>
  );
}

export default Fade;
