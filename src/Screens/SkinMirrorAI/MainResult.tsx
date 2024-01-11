import Column from '@Components/Column';
import Spacer from '@Components/Spacer';
import Text from '@Components/Text';
import { BORDER_COLOR, WHITE } from '@Constant/Color';
import { _height, _width } from '@Constant/Scale';
import { styleElement } from '@Constant/StyleElement';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
  const tranYModal = useSharedValue(0);

  useEffect(() => {
    tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 500 })
  }, [])

  // FOR DRAG
  const eventHandlerImage = useAnimatedGestureHandler({
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
      <PanGestureHandler onGestureEvent={eventHandlerImage}>
        <Animated.View style={[{ flex: 1 }, animTranYImage]}>
          <Image
            style={styles.image}
            source={{ uri: imageCapture }} />
        </Animated.View>
      </PanGestureHandler>

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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Body />
            <Spacer top={100} />
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>

    </View>
  )
}

export default MainResult

const styles = StyleSheet.create({
  image: {
    width: _width,
    height: _height,
    position: 'absolute',
    zIndex: -1
  },
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
