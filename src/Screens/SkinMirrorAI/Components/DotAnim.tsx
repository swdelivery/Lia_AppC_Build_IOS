import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import { WHITE } from '@Constant/Color';


type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  delay: number;
  size: number;
  isLasted: boolean;
  onEndAnim: () => void;
};

const DotAnim = ({ size, delay, style, isLasted, onEndAnim, ...props }: Props) => {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  const sizeDot = useMemo(() => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2
    }
  }, [size])

  const scaleDot = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      scaleDot.value = withRepeat(withSequence(withTiming(1), withTiming(0)), 5, false, (fns) => {
        if (fns) {
          if (isLasted) {
            runOnJS(onEndAnim)()
          }
        }
      });
    }, delay);
  }, [])

  const animScaleDot = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleDot.value
        }
      ]
    }
  })

  return (
    <Animated.View style={[styles.dot, style, containerStyle, sizeDot, animScaleDot, isLasted]} />
  )
}

export default DotAnim

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WHITE,
  }
})
