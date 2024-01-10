import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styleElement } from '@Constant/StyleElement'
import { _moderateScale } from '@Constant/Scale'
import { RED, WHITE } from '@Constant/Color'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import DotAnim from './DotAnim'
import ResultBoxAnim from './ResultBoxAnim'


const OverlayAnimation = () => {
  const opacityBackDrop = useSharedValue(0);

  const scaleDot = useSharedValue(0);

  const [startAnimDots, setStartAnimDots] = useState('waiting');

  const [listDots, setListDots] = useState([
    { size: 8, delay: 200, top: 450, left: 100 },
    { size: 8 * 0.75, delay: 200, top: 330, left: 200 },
    { size: 8 * .7, delay: 400, top: 410, left: 210 },
    { size: 8 * 1.15, delay: 700, top: 420, left: 150 },
    { size: 8 * 1.05, delay: 1000, top: 430, left: 300 },
    { size: 8 * 0.5, delay: 300, top: 490, left: 280 },
    { size: 8 * 1.25, delay: 600, top: 520, left: 120 },
  ])

  useEffect(() => {
    setTimeout(() => {
      opacityBackDrop.value = withTiming(1, { duration: 1000 }, (fns) => {
        if (fns) {
          runOnJS(setStartAnimDots)('doing');
        }
      })
    }, 2000);
  }, [])

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return {
      opacity: opacityBackDrop.value
    }
  })


  return (
    <View style={styleElement.flex}>
      <Animated.View style={[styles.backDrop, animOpacityBackDrop]}>

        {/* {
          startAnimDots == 'doing' ?
            <>
              {
                listDots?.map((item, index) => {
                  return (
                    <DotAnim
                      key={index}
                      size={item?.size}
                      delay={item?.delay}
                      top={item?.top}
                      left={item?.left}
                      position='absolute' />
                  )
                })
              }
            </>
            : <></>
        } */}

        <ResultBoxAnim />


      </Animated.View>
    </View>
  )
}

export default OverlayAnimation

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WHITE,
    position: 'absolute',
    top: 300,
    left: 200
  },
  backDrop: {
    ...styleElement.flex,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})
