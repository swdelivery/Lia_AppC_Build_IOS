import { Alert, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styleElement } from '@Constant/StyleElement'
import { _moderateScale } from '@Constant/Scale'
import { RED, WHITE } from '@Constant/Color'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import DotAnim from './DotAnim'
import ResultBoxAnim from './ResultBoxAnim'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  onEndAnim: (state) => void;
}

const OverlayAnimation = ({ onEndAnim }: Props) => {
  const opacityBackDrop = useSharedValue(0);
  const { top } = useSafeAreaInsets()
  const scaleDot = useSharedValue(0);

  const [startAnimDots, setStartAnimDots] = useState('waiting');
  const [startResultBox, setStartResultBox] = useState('waiting')
  const [showTitle, setShowTitle] = useState(true)

  const [listDots, setListDots] = useState([
    { size: 8, delay: 200, top: 450, left: 100 },
    { size: 8 * 0.75, delay: 200, top: 330, left: 200 },
    { size: 8 * .7, delay: 400, top: 410, left: 210 },
    { size: 8 * 1.15, delay: 700, top: 420, left: 150 },
    { size: 8 * 1.05, delay: 1000, top: 430, left: 300 },
    { size: 8 * 0.5, delay: 300, top: 490, left: 280 },
    { size: 8 * 1.25, delay: 600, top: 520, left: 120 },
  ])
  const [listResults, setListResults] = useState([
    { delay: 200, left: 100, bottom: 550, title: 'Mụn đầu đen', description: 'Nhẹ', heightBodyBox: 100, condition: 'normal' },
    { delay: 2000, left: 300, bottom: 500, title: 'Da dầu nhờn', description: 'Chú ý', heightBodyBox: 70, condition: 'medium' },
    { delay: 4000, left: 150, bottom: 420, title: 'Chân lông to', description: 'Nhẹ', heightBodyBox: 30, condition: 'normal' },
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

  const _handleEndAnimDot = () => {
    setStartAnimDots('done')
    setStartResultBox('doing')
  }
  const _handleEndAnimResult = () => {
    setShowTitle(false)
    onEndAnim(true)
  }

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return {
      opacity: opacityBackDrop.value
    }
  })


  return (
    <View style={styleElement.flex}>
      <Animated.View style={[styles.backDrop, animOpacityBackDrop]}>

        {
          showTitle ?
            <Column
              alignSelf='center'
              top={top + 8 * 2}
              position='absolute'>
              <Text style={{ textAlign: 'center' }} size={28} color={WHITE} weight='bold' >
                GƯƠNG THẦN ĐANG{'\n'}PHÂN TÍCH DA
              </Text>
            </Column>
            : <></>
        }


        {
          startAnimDots == 'doing' ?
            <>
              {
                listDots?.map((item, index) => {
                  return (
                    <DotAnim
                      onEndAnim={_handleEndAnimDot}
                      isLasted={listDots.length - 1 == index}
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
        }
        {
          startResultBox == 'doing' ?
            <>
              {
                listResults?.map((item, index) => {
                  return (
                    <ResultBoxAnim
                      onEndAnim={_handleEndAnimResult}
                      isLasted={listResults.length - 1 == index}
                      condition={item?.condition}
                      heightBodyBox={item?.heightBodyBox}
                      delay={item?.delay}
                      bottom={item?.bottom}
                      left={item?.left}
                      title={item?.title}
                      description={item?.description}
                    />
                  )
                })
              }
            </>
            : <></>
        }


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
