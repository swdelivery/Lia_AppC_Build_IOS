import Row from '@Components/Row'
import Text from '@Components/Text'
import { styleElement } from '@Constant/StyleElement'
import { openActionSheetIcon, selectItemActionSheetIcon } from '@Redux/modal/actions'
import React, { ReactNode, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { IconBooking, IconCancelGrey, IconMirrorr } from '../../Components/Icon/Icon'
import { BORDER_COLOR, WHITE } from '../../Constant/Color'
import { sizeIcon } from '../../Constant/Icon'
import { _height, _moderateScale, _width } from '../../Constant/Scale'
import { getStateActionSheetIcon } from '@Redux/modal/selectors'
import Column from '@Components/Column'


type Props = ViewStyle & {
  visible: boolean;
  heightModal: number;
  onClose: () => void;
  children?: ReactNode;
}

const ModalBottom = ({ visible, heightModal, onClose, children, ...props }: Props, ref: any) => {

  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    requestCloseModal: () => {
      _handleHideModal()
    },
  }));

  useEffect(() => {
    if (visible && heightModal) {
      tranYModal.value = withTiming(-heightModal, { duration: 200 })
      opacityBackDrop.value = withTiming(1, { duration: 300 })
    } else {
      tranYModal.value = 0
      opacityBackDrop.value = 0
    }
  }, [visible, heightModal])

  const animTranY = useAnimatedStyle(() => {
    return { transform: [{ translateY: tranYModal.value }] }
  })

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value }
  })

  const _handleHideModal = () => {
    tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) { runOnJS(_hideModal)() }
    })
    opacityBackDrop.value = withTiming(0, { duration: 200 })
  }

  const _hideModal = () => {
    onClose()
  }

  if (!visible) {
    return null;
  }


  return (
    <View style={styles.container}>
      <Animated.View style={[{
        width: _width,
        height: _height,
      }, {
        backgroundColor: 'rgba(0,0,0,.7)'
      }, animOpacityBackDrop]}>
        <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
      </Animated.View>

      <Animated.View
        style={[styles.mainModal, {
          bottom: -heightModal,
          height: heightModal
        }, animTranY, containerStyle]}>

        {children}

      </Animated.View>

    </View >

  )
}


export default forwardRef(ModalBottom)

const styles = StyleSheet.create({
  cancelBtn: {
    position: 'absolute',
    right: _moderateScale(8 * 3),
    zIndex: 100,
    top: _moderateScale(8 * 2)
  },
  option: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: _moderateScale(8 * 3)
  },
  mainModal: {
    width: _width,
    backgroundColor: WHITE,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: _moderateScale(8 * 2),
    position: 'absolute',
  },
  container: {
    width: _width,
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    bottom: 0
  }
})


const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.35,
  shadowRadius: 2,

  elevation: 5
}
