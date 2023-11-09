import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { _moderateScale, _width } from '../../Constant/Scale'
import { navigation } from '../../../rootNavigation'
import ScreenKey from '../../Navigation/ScreenKey'
import Animated, { Extrapolation, interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring } from 'react-native-reanimated'
import { BASE_COLOR } from '../../Constant/Color'
import LinearGradient from 'react-native-linear-gradient'
import { IconPhoneWhite, IconRightWhite, IconSetting } from '../../Components/Icon/Icon'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { styleElement } from '../../Constant/StyleElement'
import Header from './Components/Header'
import BoxRequireLogin from './Components/BoxRequireLogin'
import AnimatedVoucherLogin from './Components/AnimatedVoucherLogin'

const index = memo(() => {

  const RefScrollView = useAnimatedRef(null);
  const scrollY = useSharedValue(0);


  const scaleValueBanner = useSharedValue(1);
  const tranYBanner = useSharedValue(0);

  const tranYVoucher = useSharedValue(0);


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
    },
    onEndDrag: (e) => {
    },
  });

  useEffect(() => {
    _startAnimVoucher()
  }, [])

  const _startAnimVoucher = () => {
    // tranYVoucher.value = withSpring(10, {
    //   duration: 1000
    // })
    // tranYVoucher.value = withRepeat(withSpring(20), -1);
    tranYVoucher.value = withRepeat(
      withSequence(
        withSpring(10, {
          mass: 2,
          stiffness: 250,
          restDisplacementThreshold: 0.1,
        }),
        withSpring(0)
      )
      , -1);
  }

  const animVoucher = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranYVoucher.value
        }
      ]
    }
  })

  const animScaleBanner = useAnimatedStyle(() => {
    const interpolateScale = interpolate(scrollY.value, [0, -50], [1, 3], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP })

    return {
      transform: [
        {
          scale: interpolateScale,
        },
      ]
    }
  })

  return (
    <View style={styles.container}>

      <Header />



      <Animated.ScrollView
        ref={RefScrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.banner, animScaleBanner]}>
        </Animated.View>

        <BoxRequireLogin />

        <View style={{}}>

          <Animated.View style={[{
            position: 'absolute',
            alignSelf: 'center',
            top: -_moderateScale(8)
          }, animVoucher]}>
            <View style={styles.arrowUp} />
            <AnimatedVoucherLogin />
          </Animated.View>

          <View style={{height:_moderateScale(8*9)}}/>

          <View style={{
            width:_width,
            height:_moderateScale(8*8),
            borderWidth:1,
            backgroundColor:'white',
            flexDirection:'row'
          }}>
            <View style={{flex:1,borderWidth:1}}>
              
            </View>
            <View style={{flex:1,borderWidth:1}}>

            </View>
            <View style={{flex:1,borderWidth:1}}>

            </View>
            <View style={{flex:1,borderWidth:1}}>

            </View>
            <View style={{flex:1,borderWidth:1}}>

            </View>
          </View>

          <View style={{
            width: _width,
            height: 100,
          }} />
          <View style={{
            width: _width,
            height: 100,
          }} />
          <View style={{
            width: _width,
            height: 100,
          }} />
          <View style={{
            width: _width,
            height: 100,
          }} />
        </View>

      </Animated.ScrollView>

    </View>
  )
})

export default index

const styles = StyleSheet.create({
  arrowUp: {
    width: _moderateScale(8 * 1.5),
    height: _moderateScale(8 * 1.5),
    position: 'absolute',
    zIndex: 1,
    transform: [
      {
        rotate: '45deg'
      }
    ],
    left: _moderateScale(8 * 9),
    top: -_moderateScale(6),
    backgroundColor: '#FBE6D5'
  },
  banner: {
    width: _width,
    height: _moderateScale(8 * 22),
    backgroundColor: '#4CA886',
    position: 'absolute'
  },
  affiliateBtn: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04AB46',
    borderRadius: 16
  },
  container: {
    // padding:8*2,
    flex: 1,
    backgroundColor: '#F4F7F7'
    // justifyContent:'center',
    // alignItems:'center'
  }
})