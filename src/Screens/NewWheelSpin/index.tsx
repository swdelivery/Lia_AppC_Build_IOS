import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { _heightScale, _moderateScale, _widthScale } from '@Constant/Scale'
import Column from '@Components/Column'
import Animated, { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { getSpinWheelv2 } from '@Redux/Action/SpinWheelAction'
import { getImageAvataUrl } from 'src/utils/avatar'
import Row from '@Components/Row'
import { BLACK_OPACITY_4, WHITE } from '@Constant/Color'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import ModalHistory from './Components/ModalHistory'
import useVisible from 'src/Hooks/useVisible'
import ModalMissions from './Components/ModalMissions'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrActiveWheelSpin, getPartnerWheelTurn } from '@Redux/wheelSpin/actions'
import { getCurrActiveWheelSpinState, getPartnerWheelTurnState } from '@Redux/wheelSpin/selectors'
import { IconBackWhite, IconQuestion } from '@Components/Icon/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styleElement } from '@Constant/StyleElement'
import ModalInfo from './Components/ModalInfo'
import ModalReward from './Components/ModalReward'
import { useNavigate } from 'src/Hooks/useNavigation'

const NewWheelSpin = () => {
  const dispatch = useDispatch()
  const { navigation } = useNavigate()
  const { top } = useSafeAreaInsets()

  const { data: currActiveWheel } = useSelector(getCurrActiveWheelSpinState)
  const { data: wheelTurnCount } = useSelector(getPartnerWheelTurnState)

  const rotateCircle = useSharedValue(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const visibleListHistory = useVisible()
  const visibleListMission = useVisible()
  const visibleModalInfo = useVisible()
  const visibleModalReward = useVisible()

  useEffect(() => {
    dispatch(getCurrActiveWheelSpin.request())
    dispatch(getPartnerWheelTurn.request())
    // _getPartnerWheelTurn();
  }, [])

  // FUNCTION
  const _startSpin = useCallback(async () => {
    // visibleModalReward.show()
    // return
    let result = await getSpinWheelv2();
    let findIndex = currActiveWheel?.details?.findIndex(item => item?._id == result?.data?.data?.awards?._id);

    if (findIndex !== -1) {
      setIsSpinning(true)
      rotateCircle.value = 0
      rotateCircle.value = withTiming(3 - findIndex / 8, {
        duration: 4000,
        easing: Easing.out(Easing.quad)
      }, (fns) => {
        if (fns) {
          runOnJS(_handleSpinDone)(result)
        }
      })
    }
  }, [currActiveWheel])

  _handleSpinDone = (result) => {
    console.log({ result });
    visibleModalReward.show(result?.data?.data)

    setIsSpinning(false)
    dispatch(getPartnerWheelTurn.request())
  }

  const _handleGetReward = useCallback(() => {
    visibleModalReward.hide()
    // visibleListHistory.show()
  }, [])

  // ANIMATION
  const animCircle = useAnimatedStyle(() => {
    const interpolateRotate = interpolate(rotateCircle.value, [0, 1], ['0', '360'], {});
    return {
      transform: [{ rotate: `${interpolateRotate}deg` }]
    }
  })

  return (
    <Screen>
      <FocusAwareStatusBar />
      <ImageBackground
        resizeMode='stretch'
        style={styles.bg}
        source={require('../../Image/newWheelSpin/bg.png')} >

        <Column
          onPress={navigation.goBack}
          backgroundColor={BLACK_OPACITY_4}
          top={top + 8}
          borderRadius={8 * 10}
          left={20}
          position="absolute">
          <IconBackWhite />
        </Column>

        <TouchableOpacity
          onPress={visibleModalInfo.show}
          hitSlop={styleElement.hitslopSm}
          style={{
            top: top + 8,
            right: 8 * 3,
            position: 'absolute'
          }}>
          <IconQuestion />
        </TouchableOpacity>

        <Image
          resizeMode='contain'
          style={styles.title}
          source={require('../../Image/newWheelSpin/title.png')} />

        <View style={styles.containerCircle}>
          <Image
            resizeMode='contain'
            style={styles.arrowDown}
            source={require('../../Image/newWheelSpin/arrowDown.png')} />

          {/* ANIMATED CIRCLE */}
          <Animated.View style={animCircle}>
            <Image
              resizeMode='contain'
              style={styles.circle}
              source={{ uri: getImageAvataUrl(currActiveWheel?.imageResponse) }} />
          </Animated.View>
          <Image
            style={styles.center}
            source={require('../../Image/newWheelSpin/center.png')} />
        </View>

        <View style={styles.containerBtnStart}>
          <View style={styles.countTurn}>
            <Text
              weight='bold'
              color={'#CE0922'}
              size={12}>
              Còn {wheelTurnCount} lượt quay
            </Text>
          </View>
          <TouchableOpacity
            disabled={isSpinning}
            onPress={_startSpin}
            activeOpacity={.5}>
            <Image
              resizeMode='contain'
              style={styles.btnStart}
              source={require('../../Image/newWheelSpin/btnStart.png')} />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={styles.containerBtnBuyTurn}>
        <Image
          resizeMode='contain'
          style={styles.btnBuyTurn}
          source={require('../../Image/newWheelSpin/buyTurn.png')} />
      </TouchableOpacity> */}

        <Image
          resizeMode='contain'
          style={styles.podium}
          source={require('../../Image/newWheelSpin/podium.png')} />

        <Row
          gap={8 * 10}
          alignSelf='center'
          bottom={_heightScale(8 * 6)}
          position='absolute'>
          <TouchableOpacity onPress={visibleListMission.show}>
            <Column alignItems='center'>
              <Image
                resizeMode='contain'
                style={styles.btnBottom}
                source={require('../../Image/newWheelSpin/btnNv.png')} />
              <Text
                color={WHITE}
                weight='bold'>
                Nhiệm vụ
              </Text>
            </Column>
          </TouchableOpacity>

          <TouchableOpacity onPress={visibleListHistory.show}>
            <Column alignItems='center'>
              <Image
                resizeMode='contain'
                style={styles.btnBottom}
                source={require('../../Image/newWheelSpin/btnLs.png')} />
              <Text
                color={WHITE}
                weight='bold'>
                Lịch sử
              </Text>
            </Column>
          </TouchableOpacity>
        </Row>
        <ModalHistory
          visibleListHistory={visibleListHistory} />
        <ModalMissions
          visibleListMission={visibleListMission} />
        <ModalInfo
          visibleModalInfo={visibleModalInfo} />
        <ModalReward
          onPress={_handleGetReward}
          visible={visibleModalReward} />
      </ImageBackground>
    </Screen>
  )
}

export default NewWheelSpin

const styles = StyleSheet.create({
  btnBottom: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
  },
  containerBtnBuyTurn: {
    position: 'absolute',
    zIndex: 5,
    bottom: _heightScale(8 * 28)
  },
  btnBuyTurn: {
    width: _moderateScale(8 * 13),
    height: _moderateScale(8 * 4),
  },
  title: {
    width: _heightScale(8 * 33),
    height: _moderateScale(8 * 16),
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    top: _heightScale(8 * 10)
  },
  countTurn: {
    width: _heightScale(8 * 20),
    height: _heightScale(8 * 2.5),
    alignSelf: 'center',
    backgroundColor: '#FFD60E',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8 * 2,
    borderTopRightRadius: 8 * 2,
    position: 'absolute',
    top: -_heightScale(8 * 2)
  },
  btnStart: {
    width: _heightScale(8 * 24),
    height: _heightScale(8 * 7),
  },
  containerBtnStart: {
    position: 'absolute',
    zIndex: 4,
    bottom: _heightScale(8 * 17),
    alignSelf: 'center'
  },
  arrowDown: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 6),
    position: 'absolute',
    zIndex: 3,
    top: -_moderateScale(4)
  },
  center: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    position: 'absolute'
  },
  containerCircle: {
    width: _heightScale(8 * 40),
    height: _heightScale(8 * 40),
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    bottom: _heightScale(8 * 32),
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: _heightScale(8 * 40),
    height: _heightScale(8 * 40),
  },
  podium: {
    position: 'absolute',
    zIndex: 0,
    bottom: _heightScale(8 * 19),
    width: _heightScale(8 * 46),
    height: _heightScale(8 * 18),
    alignSelf: 'center'
  },
  bg: {
    flex: 1
  }
})
