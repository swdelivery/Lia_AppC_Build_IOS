import { Alert, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { _height, _width } from '@Constant/Scale'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { getStateModalRightNoti } from '@Redux/modal/selectors'
import { getPartnerNotifications, openModalRightNoti } from '@Redux/modal/actions'
import Column from '@Components/Column'
import Text from '@Components/Text'
import LoadingIndicator from '@Components/LoadingIndicator/LoadingIndicator'
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData'
import ItemNoti from './ItemNoti'
import { IconCancelGrey } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import { styleElement } from '@Constant/StyleElement'

const WIDTH_MODAL = _width / 1.35

const RightNoti = () => {

  const { top, bottom } = useSafeAreaInsets()
  const dispatch = useDispatch()
  const { visible, data, isLoading } = useSelector(getStateModalRightNoti)

  const tranX = useSharedValue(0);
  const opacityBackDrop = useSharedValue(0);


  useEffect(() => {
    if (visible) {
      dispatch(getPartnerNotifications.request({
        limit: 20
      }))

      tranX.value = withTiming(-WIDTH_MODAL, { duration: 300 })
      opacityBackDrop.value = withTiming(1, { duration: 300 })
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
  }
  const _handleHide = () => {
    dispatch(openModalRightNoti())
  }

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value }
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

  const _renderItem = ({ item, index }) => {
    return (
      <ItemNoti
        onClose={_handleClosing}
        data={item} />
    )
  }

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

      <Animated.View style={[
        styles.containerRightTab,
        { right: - WIDTH_MODAL },
        animTranXModal]}>
        <Column
          marginBottom={8 * 2}
          alignItems='center'
          marginTop={top + 8 * 2}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>
            Thông báo chung
          </Text>

          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleClosing}
            style={styles.btnCancel}>
            <IconCancelGrey style={sizeIcon.md} />
          </TouchableOpacity>
        </Column>
        {
          (!data && isLoading) ?
            <LoadingIndicator />
            :
            <FlatList
              contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom }}
              ListEmptyComponent={<EmptyResultData />}
              data={data}
              renderItem={_renderItem}
              keyExtractor={(item, index) => item?.id} />
        }
      </Animated.View>
    </View>
  )
}

export default RightNoti

const styles = StyleSheet.create({
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
  }
})
