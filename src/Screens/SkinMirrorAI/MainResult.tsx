import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '@Components/Screen'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { _height, _width } from '@Constant/Scale';
import { BORDER_COLOR, WHITE } from '@Constant/Color';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Column from '@Components/Column';
import Text from '@Components/Text';
import { styleElement } from '@Constant/StyleElement';
import Body from './MainResultComponents/Body';



const clamp = (value, min, max) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};
const HEIGHT_MODAL = 700

type Props = {
  imageCapture: string;
}

const MainResult = ({ imageCapture }: Props) => {
  const tranYImage = useSharedValue(0);
  const tranYModal = useSharedValue(0);

  useEffect(() => {
    tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 1000 })
  }, [])

  // FOR DRAG
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = tranYModal.value;
    },
    onActive: (event, ctx) => {
      tranYModal.value = clamp(
        ctx.startY + event.translationY,
        -HEIGHT_MODAL,
        0
      );
    },
    onEnd: (event, ctx) => {
      if (event.translationY > 200) {
        tranYModal.value = withTiming(-200, { duration: 100 })
      } else {
        tranYModal.value = withTiming(-HEIGHT_MODAL)
      }

    },
  });

  // FOR ANIMATED
  const animTranYImage = useAnimatedStyle(() => {
    const interpolateValue = interpolate(tranYModal.value, [0, -HEIGHT_MODAL], [0, -300])
    return {
      transform: [
        {
          translateY: interpolateValue
        }
      ]
    }
  })
  const animTranYModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranYModal.value
        }
      ]
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[{ flex: 1 }, animTranYImage]}>
        <Image
          style={{
            width: _width,
            height: _height,
            position: 'absolute',
            zIndex: -1
          }}
          source={{ uri: imageCapture }} />
      </Animated.View>

      {/* MODAL BOTTOM */}
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.modalContainer, { bottom: - HEIGHT_MODAL }, animTranYModal]}>
          <Column
            style={styleElement.centerChild}
            borderBottomWidth={1}
            borderColor={BORDER_COLOR}
            padding={8 * 2}>
            <Text
              weight='bold'
              size={14}>
              Kết quả phân tích da
            </Text>
          </Column>
          <ScrollView>
            <Body />
          </ScrollView>

        </Animated.View>
      </PanGestureHandler>

    </View>
  )
}

export default MainResult

const styles = StyleSheet.create({
  modalContainer: {
    width: _width,
    height: HEIGHT_MODAL,
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 8 * 2,
    borderTopRightRadius: 8 * 2
  }
})
