// import Image from '@Components/Image'
import Column from '@Components/Column'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import Text from '@Components/Text'
import { _height, _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React, { useCallback, useEffect, useRef } from 'react'
import { Alert, Image, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { getImageAvataUrl } from 'src/utils/avatar'

type Props = {
  visible: any;
}

const ModalReward = ({ visible }: Props) => {
  const scaleBtn = useSharedValue(1);
  const requestCloseModalRef = useRef<any>(null)

  useEffect(() => {
    scaleBtn.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      )
      , -1);
  }, [])

  const _handleCloseModal = useCallback(() => {
    if (requestCloseModalRef.current) {
      requestCloseModalRef.current.requestCloseModal()
    }
  }, [])

  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleBtn.value
        }
      ]
    }
  })

  return (
    <ModalBottom
      ref={requestCloseModalRef}
      backgroundColor={'transparent'}
      onClose={visible.hide}
      heightModal={_height}
      justifyContent='center'
      alignItems='center'
      visible={visible.visible} >
      <View>
        <Image
          resizeMode='contain'
          style={styles.imageReward}
          source={{ uri: getImageAvataUrl(visible.selectedItem.current?.awards?.imageReward) }} />
        <Animated.View style={[styles.btnGetReward, scaleAnim]}>
          <TouchableOpacity onPress={_handleCloseModal}>
            <Image
              resizeMode='contain'
              style={styles.btnGetReward__image}
              source={require('../../../Image/spin/btnGetReward.png')} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ModalBottom>
  )
}

export default ModalReward

const styles = StyleSheet.create({
  btnGetReward__image: {
    width: '100%',
    height: '100%'
  },
  btnGetReward: {
    width: 8 * 20,
    height: 8 * 5,
    position: 'absolute',
    bottom: 8 * 3,
    alignSelf: 'center',
    zIndex: 1,
  },
  imageReward: {
    width: _moderateScale(320),
    height: _moderateScale(320) * 500 / 420,
  },
})
