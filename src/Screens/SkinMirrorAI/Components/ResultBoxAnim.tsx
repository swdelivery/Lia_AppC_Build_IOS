import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Column from '@Components/Column';
import { BLUE_FB, GREEN_2, RED, WHITE } from '@Constant/Color';
import Text from '@Components/Text';



type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  delay: number;
  title: string
  description: string;
  heightBodyBox: number;
  condition: string;
  isLasted: boolean;
  onEndAnim: () => void;
};

const ResultBoxAnim = ({ onEndAnim, isLasted, condition, heightBodyBox, title, description, delay, style, ...props }: Props) => {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  const sizeRootDot = useSharedValue(0);
  const heightBody = useSharedValue(0);
  const heighMainBox = useSharedValue(0);
  const widthMainBox = useSharedValue(0);
  const opacityResultText = useSharedValue(0);

  useEffect(() => {

    setTimeout(() => {
      sizeRootDot.value = withTiming(8, { duration: 1000 }, (fns) => {
        if (fns) {
          heightBody.value = withTiming(heightBodyBox, { duration: 1000 })
          widthMainBox.value = withTiming(8 * 15, { duration: 200 }, (fns) => {
            if (fns) {
              heighMainBox.value = withTiming(50, { duration: 1000 }, (fns) => {
                opacityResultText.value = withTiming(1, { duration: 200 }, (fns) => {
                  if (fns) {
                    if (isLasted) {
                      runOnJS(onEndAnim)()
                    }
                  }
                })
              })
            }
          })
        }
      });
    }, delay);
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
  const opacityResultTextAnim = useAnimatedStyle(() => {
    return {
      opacity: opacityResultText.value
    }
  })

  const generateCondition = useMemo(() => {
    switch (condition) {
      case 'normal':
        return GREEN_2
      case 'medium':
        return RED
      default:
        return BLUE_FB
    }
  }, [condition])

  return (
    <View style={[{
      position: 'absolute',
    }, containerStyle]}>
      <Column alignItems='center'>
        <Animated.View style={[styles.mainBox, { bottom: heightBodyBox + 8 }, mainBoxAnim]}>
          <Animated.View style={opacityResultTextAnim}>
            <Text
              weight='bold'
              color={WHITE}>
              {title}
            </Text>
            <Text size={12} color={WHITE}>
              Mức độ: <Text size={12} weight='bold' color={generateCondition}> {description}</Text>
            </Text>
          </Animated.View>
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

    justifyContent: 'center',
    paddingLeft: 8,
    // alignItems: 'center'
    backgroundColor: 'rgba(0,0,0,.5)'
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
