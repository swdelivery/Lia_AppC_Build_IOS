import ActionButton from '@Components/ActionButton/ActionButton'
import Column from '@Components/Column'
import { IconCancelGrey } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLUE_FB, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _heightScale, _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import ListAllDistrict from './ModalBottomLocationComponents/ListAllDistrict'
import ListAllProvince from './ModalBottomLocationComponents/ListAllProvince'
import { useSelector } from 'react-redux'
import { getDataFilterServiceState } from '@Redux/category/selectors'

const HEIGHT_MODAL = _heightScale(650)

type Props = {
  visible: boolean;
  onClose?: () => void;
  provinceChoiced: any;
  setProvinceChoiced: (item) => void
};

const ModalBottomLocation = ({ visible, onClose, provinceChoiced, setProvinceChoiced }: Props) => {
  const tranY = useSharedValue(0);
  const opacityBackDrop = useSharedValue(0);

  const [currTypeChoice, setCurrTypeChoice] = useState('province')
  const [districtChoiced, setDistrictChoiced] = useState(null)


  useEffect(() => {
    if (visible) {
      tranY.value = withTiming(-HEIGHT_MODAL, { duration: 300 })
      opacityBackDrop.value = withTiming(1, { duration: 300 })
    } else {
      tranY.value = withTiming(0, { duration: 300 })
    }
  }, [visible])

  // useEffect(() => {
  //   if (!isEmpty(provinceChoiced)) {
  //     setCurrTypeChoice('district')
  //   }
  // }, [provinceChoiced])

  // FUNCTION
  const _handleConfirm = () => {
    _handleClosing()
  }

  // FOR ANIMATION
  const _handleClosing = () => {
    tranY.value = withTiming(0, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(_handleHide)()
      }
    })
    opacityBackDrop.value = withTiming(0, { duration: 200 })
  }
  const _handleHide = () => {
    onClose()
  }

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value }
  })
  const animTranYModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranY.value,
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

      <Animated.View style={[
        styles.containerRightTab,
        { bottom: - HEIGHT_MODAL },
        { height: HEIGHT_MODAL },
        animTranYModal]}>
        <Column
          marginBottom={8 * 2}
          alignItems='center'
          marginTop={8 * 2}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>
            Vị trí
          </Text>

          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleClosing}
            style={styles.btnCancel}>
            <IconCancelGrey style={sizeIcon.md} />
          </TouchableOpacity>
        </Column>

        {/* TEMP CLOSE */}
        {/* {
          !isEmpty(provinceChoiced) ?
            <Column paddingHorizontal={8 * 2}>
              <Row>
                <Text>
                  Đã chọn:
                </Text>
                <Text color={BLUE_FB}>
                  {` ${provinceChoiced}`}
                </Text>
                {
                  !isEmpty(districtChoiced) ?
                    <Text color={BLUE_FB}>
                      {` - ${districtChoiced?.name}`}
                    </Text>
                    : <></>
                }
              </Row>
            </Column>
            :
            <></>
        } */}
        {
          currTypeChoice == 'province' ?
            <ListAllProvince
              provinceChoiced={provinceChoiced}
              onChoice={(data) => {
                setProvinceChoiced(data)
                _handleClosing()
              }} />
            : <></>
        }

        {/* WAITING BACKEND UPDATE DISTRICT API */}
        {/* {
          currTypeChoice == 'district' ?
            <ListAllDistrict
              onBack={(data) => {
                setCurrTypeChoice(data)
                setDistrictChoiced(null)
              }}
              districtChoiced={districtChoiced}
              onChoice={setDistrictChoiced}
              provinceChoiced={provinceChoiced} />
            : <></>
        } */}
        {/* <ActionButton
          colors={[NEW_BASE_COLOR, NEW_BASE_COLOR]}
          onPress={_handleConfirm}
          title='Xác nhận' /> */}
      </Animated.View>
    </View>
  )
}

export default ModalBottomLocation

const styles = StyleSheet.create({
  btnCancel: {
    position: 'absolute',
    zIndex: 1,
    right: 8 * 2
  },
  containerRightTab: {
    width: _width,
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
