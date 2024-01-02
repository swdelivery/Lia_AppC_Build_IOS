// import Image from '@Components/Image'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import Text from '@Components/Text'
import { _height, _moderateScale } from '@Constant/Scale'
import React, { useCallback, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { getImageAvataUrl } from 'src/utils/avatar'

type Props = {
  visible: any;
  onPress: () => void;
}

const ModalReward = ({ visible, onPress }: Props) => {
  const scaleBtn = useSharedValue(1);

  useEffect(() => {
    scaleBtn.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      )
      , -1);

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
      backgroundColor={'transparent'}
      onClose={visible.hide}
      heightModal={_height}
      justifyContent='center'
      alignItems='center'
      visible={visible.visible} >

      <View>
        {/* <Text>
          {visible.selectedItem.current?.awards?.name}
        </Text> */}
        <Image
          resizeMode='contain'
          style={styles.imageReward}
          source={{ uri: getImageAvataUrl(visible.selectedItem.current?.awards?.imageReward) }} />

        <TouchableOpacity onPress={onPress}>
          <Animated.Image
            resizeMode='contain'
            style={[styles.btnGetReward, scaleAnim]}
            source={require('../../../Image/spin/btnGetReward.png')} />
        </TouchableOpacity>
      </View>


    </ModalBottom>
  )
}

export default ModalReward

const styles = StyleSheet.create({
  btnGetReward: {
    width: 8 * 20,
    height: 8 * 5,
    position: 'absolute',
    bottom: 8 * 3,
    alignSelf: 'center'
  },
  imageReward: {
    width: _moderateScale(320),
    height: _moderateScale(320) * 500 / 420,
  },
})
