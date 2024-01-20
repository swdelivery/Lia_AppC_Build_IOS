import Column from '@Components/Column'
import Icon from '@Components/Icon'
import { BLACK, WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import { useNavigate } from 'src/Hooks/useNavigation'
import useRequireLoginCallback from 'src/Hooks/useRequireLoginAction'

const BtnSpinAnim = () => {
  const { navigate } = useNavigate()
  const [visible, setVisible] = useState(true)
  const ballX = useSharedValue(0);
  const ballY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const _handleHide = useCallback(() => {
    setVisible(false)
  }, [])

  const _handleGoSpinWheel = useRequireLoginCallback(() => {
    navigate(ScreenKey.WHEEL_SPIN)()
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      rotate.value = withRepeat(withSequence(withDelay(3000, withTiming(1, { duration: 2000 })), withTiming(0, { duration: 0 })), 5)
    })
  }, [])

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = ballX.value;
      ctx.startY = ballY.value;
    },
    onActive: (event, ctx) => {
      ballX.value = ctx.startX + event.translationX;
      ballY.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      if (event?.absoluteX < _width / 2) {
        ballX.value = withTiming(-(_width - 8 * 10), { duration: 500 })
      } else {
        ballX.value = withTiming(10, { duration: 500 })
      }
    },
  });

  // ANIMATION
  const animCircle = useAnimatedStyle(() => {
    const interpolateRotate = interpolate(rotate.value, [0, 1], ['0', '360'], {});
    return {
      transform: [{ rotate: `${interpolateRotate}deg` }]
    }
  })
  const animatedBall = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: ballX.value,
        },
        {
          translateY: ballY.value
        },
      ],
    };
  });

  if (!visible) return null

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.btnSpin, animatedBall]} >
        <Column onPress={_handleGoSpinWheel}>
          <Animated.View style={animCircle}>
            <Image
              style={styles.image}
              source={{ uri: `https://liabeautyapi-dev.vndigitech.com/public/configSpinWheel/1705286000972fRxU.png` }} />
          </Animated.View>
        </Column>

        <Column
          onPress={_handleHide}
          top={-4}
          right={-4}
          width={8 * 2.5}
          height={8 * 2.5}
          style={styleElement.centerChild}
          borderRadius={8 * 2}
          backgroundColor={BLACK}
          position='absolute'>
          <Icon size={14} color={WHITE} name='close' />
        </Column>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default BtnSpinAnim

const styles = StyleSheet.create({
  image: {
    width: 8 * 8,
    height: 8 * 8,
    borderRadius: 8 * 5
  },
  btnSpin: {
    width: 8 * 8,
    height: 8 * 8,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 8 * 2,
    bottom: 8 * 1,
    borderRadius: 8 * 5,
    zIndex: 10
  }
})
