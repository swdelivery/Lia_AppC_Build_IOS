import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useHapticCallback from 'src/Hooks/useHapticCallback';


const WIDTH_BOX = 8 * 6
type Props = {
  isActive?: boolean;
  onPress: (state) => void;
};

const Toggle = ({ isActive, onPress }: Props) => {
  const tranX = useSharedValue(0);
  const widthFillColor = useSharedValue(0)

  useEffect(() => {
    if (isActive) {
      tranX.value = withTiming(WIDTH_BOX - 8 * 3, { duration: 200 })
      widthFillColor.value = withTiming(WIDTH_BOX, { duration: 200 })
    } else {
      tranX.value = withTiming(0, { duration: 200 })
      widthFillColor.value = withTiming(0, { duration: 200 })
    }
  }, [isActive])

  const animTranX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranX.value
        }
      ]
    }
  })
  const animWidth = useAnimatedStyle(() => {
    return {
      width: widthFillColor.value
    }
  })

  const _handlePress = useHapticCallback(() => {
    onPress(!isActive)
  }, [isActive])

  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={_handlePress}
      style={styles.container}>
      <Animated.View style={[styles.fillColor, animWidth]} />
      <Animated.View style={[styles.dot, animTranX]} />
    </TouchableOpacity>
  )
}

export default Toggle

const styles = StyleSheet.create({
  fillColor: {
    height: 8 * 3,
    backgroundColor: NEW_BASE_COLOR,
    position: 'absolute',
    zIndex: 1
  },
  dot: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 8 * 3,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    position: 'absolute',
    zIndex: 2
  },
  container: {
    overflow: 'hidden',
    width: 8 * 6,
    height: 8 * 3,
    backgroundColor: "#D9D9D9",
    borderRadius: 8 * 5
  }
})
