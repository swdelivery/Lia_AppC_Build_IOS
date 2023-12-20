import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { formatMonney } from '@Constant/Utils'
import { openModalThanks } from '@Redux/modal/actions'
import { getStateModalThanks } from '@Redux/modal/selectors'
import React, { useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

const WIDTH_MODAL = _width / 1.35

const ModalThanks = () => {

  const { top, bottom } = useSafeAreaInsets()
  const dispatch = useDispatch()
  const { visible, data: { type, name, campainName, ownerName, price } } = useSelector(getStateModalThanks)

  const tranX = useSharedValue(0);
  const opacityBackDrop = useSharedValue(0);
  const opacityImage = useSharedValue(0);



  useEffect(() => {
    if (visible) {
      tranX.value = withTiming(-WIDTH_MODAL, { duration: 300 })
      opacityBackDrop.value = withTiming(1, { duration: 300 })
      opacityImage.value = withTiming(1, { duration: 300 })
    } else {
      tranX.value = withTiming(0, { duration: 300 })
    }
  }, [visible])

  const _handleClosing = () => {
    tranX.value = withTiming(0, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(_handleHide)()
      }
    })
    opacityBackDrop.value = withTiming(0, { duration: 200 })
    opacityImage.value = withTiming(0, { duration: 200 })
  }
  const _handleHide = () => {
    dispatch(openModalThanks({
      visible: false
    }))
  }

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value }
  })
  const animOpacityImage = useAnimatedStyle(() => {
    return { opacity: opacityImage.value }
  })
  const animTranXModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranX.value,
        },
      ],
    };
  })

  if (!visible) return null
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: _width,
            height: '100%',
          },
          { backgroundColor: "rgba(0,0,0,.7)" },
          animOpacityBackDrop
        ]}>
        <TouchableOpacity
          onPress={_handleClosing}
          style={[StyleSheet.absoluteFillObject]} />
      </Animated.View>

      <Animated.View style={[styles.containerImage, animOpacityImage]}>
        <Image
          style={styles.image}
          source={require('../../Image/charity/pic_thanks.png')} />
        <Column
          paddingHorizontal={8 * 4}
          bottom={8 * 8}
          position='absolute'>
          {
            type == 'companion' ?
              <Text style={{ textAlign: 'center' }}>
                Cảm ơn
                <Text weight='bold'> {name} </Text>
                đã đồng hành gây quỹ cùng chiến dịch
                <Text weight='bold'> {campainName} </Text>
                của
                <Text weight='bold'> {ownerName} </Text>
              </Text>
              :
              <></>
          }
          {
            type == 'donation' ?
              <Text style={{ textAlign: 'center' }}>
                Cảm ơn
                <Text weight='bold'> {name} </Text>
                đã ủng hộ
                <Text weight='bold'> {formatMonney(price)} VND </Text>
                vào chiến dịch
                <Text weight='bold'> {campainName} </Text>
                của
                <Text weight='bold'> {ownerName} </Text>
              </Text>
              :
              <></>
          }

        </Column>
      </Animated.View>

      <Column
        onPress={_handleClosing}
        bottom={8 * 22}
        zIndex={2}
        padding={8}
        borderRadius={8 * 10}
        borderWidth={1}
        borderColor={WHITE}
        position='absolute'>
        <Icon name="window-close" color={WHITE} size={18} />
      </Column>
    </View>
  )
}

export default ModalThanks

const styles = StyleSheet.create({
  containerImage: {
    position: 'absolute',
    zIndex: 1
  },
  image: {
    width: _width - 8 * 4,
    height: _width - 8 * 4,
    borderRadius: 8 * 2
  },
  btnCancel: {
    position: 'absolute',
    zIndex: 1,
    right: 8 * 2
  },
  containerRightTab: {
    width: WIDTH_MODAL,
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: WHITE,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
