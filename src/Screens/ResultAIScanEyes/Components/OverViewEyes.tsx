import Column from '@Components/Column'
import { IconBagFat, IconCurvedArrow } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import ScreenKey from '@Navigation/ScreenKey'
import { getEyeLabelState } from '@Redux/resultcanningeyes/selectors'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Svg from 'react-native-svg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import { GREY_FOR_TITLE, RED, WHITE } from '../../../Constant/Color'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { styleElement } from '@Constant/StyleElement'

// const WIDTH_IMAGE = _moderateScale(8 * 18)
const WIDTH_IMAGE = ((_width - (8 * 2 * 2)) - 8 * 6) / 2

const OverViewEyes = (props) => {
  const { croppedLeftEyeImage: {
    ratio: ratioLeft,
    boxEyelid: boxEyelidLeft,
    boxFatBag: boxFatBagLeft,
    width: widthLeft,
    height: heightLeft,
    uri: uriLeft
  }, scanningResult } = props

  const { croppedRightEyeImage: {
    ratio: ratioRight,
    boxEyelid: boxEyelidRight,
    boxFatBag: boxFatBagRight,
    width: widthRight,
    height: heightRight,
    uri: uriRight
  } } = props

  return (
    <Column
      padding={8 * 2}
      borderRadius={8 * 2}
      backgroundColor={WHITE}
      style={styleElement.shadow}
      marginHorizontal={8 * 2}>

      <Row justifyContent='space-between'>
        {
          ratioLeft ?
            <View style={{
              width: WIDTH_IMAGE,
              height: WIDTH_IMAGE,
              borderRadius: _moderateScale(8 * 2),
              overflow: 'hidden'
            }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />

              {
                boxEyelidLeft?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxEyelidLeft?.point1.x / widthLeft,
                    top: WIDTH_IMAGE / ratioLeft * boxEyelidLeft?.point1.y / heightLeft - (20)
                  }}>
                    <IconCurvedArrow
                      height={20}
                      width={WIDTH_IMAGE * (boxEyelidLeft?.point2.x - boxEyelidLeft?.point1.x) / widthLeft}
                    />
                  </View>
                  : <></>
              }
              {
                boxFatBagLeft?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxFatBagLeft?.point1.x / widthLeft,
                    top: WIDTH_IMAGE / ratioLeft * boxFatBagLeft?.point1.y / heightLeft + 4
                  }}>
                    <IconBagFat width={WIDTH_IMAGE * (boxFatBagLeft?.point2.x - boxFatBagLeft?.point1.x) / widthLeft} />
                  </View>
                  : <></>
              }
              <Image
                style={[styles.overView__box__leftEye__image, {
                  width: WIDTH_IMAGE,
                  height: WIDTH_IMAGE,
                  position: 'absolute',
                  zIndex: -1
                }]}
                source={{ uri: `${uriLeft}` }} />
            </View>
            : <></>
        }

        {
          ratioRight ?
            <View style={{
              width: WIDTH_IMAGE,
              height: WIDTH_IMAGE,
              borderRadius: _moderateScale(8 * 2),
              overflow: 'hidden'
            }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
              {
                boxEyelidRight?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxEyelidRight?.point1.x / widthRight,
                    top: WIDTH_IMAGE / ratioRight * boxEyelidRight?.point1.y / heightRight - (20)
                  }}>
                    <IconCurvedArrow
                      height={20}
                      width={WIDTH_IMAGE * (boxEyelidRight?.point2.x - boxEyelidRight?.point1.x) / widthRight}
                    />
                  </View>
                  : <></>
              }
              {
                boxFatBagRight?.point1.x ?
                  <View style={{
                    position: 'absolute',
                    left: WIDTH_IMAGE * boxFatBagRight?.point1.x / widthRight,
                    top: WIDTH_IMAGE / ratioRight * boxFatBagRight?.point1.y / heightRight + 4
                  }}>
                    <IconBagFat width={WIDTH_IMAGE * (boxFatBagRight?.point2.x - boxFatBagRight?.point1.x) / widthRight} />
                  </View>
                  : <></>
              }
              <Image
                style={[styles.overView__box__leftEye__image, {
                  width: WIDTH_IMAGE,
                  height: WIDTH_IMAGE,
                  position: 'absolute',
                  zIndex: -1
                }]}
                source={{ uri: `${uriRight}` }} />
            </View>
            : <></>
        }
      </Row>

    </Column>
  )
}

export default OverViewEyes

const styles = StyleSheet.create({
  overView__box__leftEye__image: {
    borderRadius: _moderateScale(8 * 2),
  },
})
