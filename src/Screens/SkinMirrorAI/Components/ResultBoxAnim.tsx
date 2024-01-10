import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Column from '@Components/Column';
import { WHITE } from '@Constant/Color';
import Text from '@Components/Text';

const ResultBoxAnim = () => {
  const sizeRootDot = useSharedValue(0);
  const heightBody = useSharedValue(0);
  const heighMainBox = useSharedValue(0);
  const widthMainBox = useSharedValue(0);

  useEffect(() => {

    setTimeout(() => {
      sizeRootDot.value = withTiming(8, { duration: 1000 }, (fns) => {
        if (fns) {
          heightBody.value = withTiming(100, { duration: 1000 })
          widthMainBox.value = withTiming(8 * 15, { duration: 200 }, (fns) => {
            if (fns) {
              heighMainBox.value = withTiming(50, { duration: 1000 })
            }
          })
        }
      });
    }, 3000);
  }, [])

  const sizeRootDotAnim = useAnimatedStyle(() => {
    return {
      width: sizeRootDot.value,
      height: sizeRootDot.value,
    }
  })
  const heightBodyAnim = useAnimatedStyle(() => {
    return {
      height: heightBody.value
    }
  })
  const mainBoxAnim = useAnimatedStyle(() => {
    return {
      width: widthMainBox.value,
      height: heighMainBox.value
    }
  })

  return (
    <View style={{
      position: 'absolute',
      left: 100,
      bottom: 500
    }}>
      <Column alignItems='center'>
        <Animated.View style={[styles.mainBox, mainBoxAnim]}>
          <Text
            weight='bold'
            color={WHITE}>
            Mụn đầu đen
          </Text>
        </Animated.View>
        <Animated.View style={[styles.body, heightBodyAnim]} />
        <Animated.View style={[styles.styleRootDot, sizeRootDotAnim]} />
      </Column>
    </View>
  )
}

export default ResultBoxAnim

const styles = StyleSheet.create({
  mainBox: {
    width: 8 * 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: WHITE,
    position: 'absolute',
    bottom: 100 + 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    width: 1,
    backgroundColor: WHITE
  },
  styleRootDot: {
    backgroundColor: WHITE,
    borderRadius: 1000
  }
})
