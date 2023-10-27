import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import LiAHeader from '../../Components/Header/LiAHeader'
import HorizontalBanner from './Components/HorizontalBanner'
import HorizontalTab from './Components/HorizontalTab'
import ListVoucher from './Components/ListVoucher'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Header from './Components/Header'

const LiAVoucher = memo(() => {

  const [preColor, setPreColor] = useState('#000')
  const [primaryColor, setPrimaryColor] = useState(null)

  const [preSecondColor, setPreSecondColor] = useState('#000')
  const [secondColor, setSecondColor] = useState(null)

  const flagIndexHasChanged = useSharedValue(0)
  const flagSecondIndexHasChanged = useSharedValue(0)
  const [time, setTime] = useState(0);
  const [isDragingBanner, setIsDragingBanner] = useState(false)
  const [interval, setInterval] = useState(null)


  const animBG = useAnimatedStyle(() => {
    if (primaryColor) {
      const animtedColor = interpolateColor(
        flagIndexHasChanged.value,
        [0, 1],
        [preColor, primaryColor],
      );
      return {
        backgroundColor: animtedColor
      }
    } else {
      return {

      }
    }

  })


  return (
    <Animated.View style={[styles.container, animBG]}>

      <Header
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        flagIndexHasChanged={flagIndexHasChanged}
        flagSecondIndexHasChanged={flagSecondIndexHasChanged}
        preColor={preColor}
        setPreColor={setPreColor}
        preSecondColor={preSecondColor}
        setPreSecondColor={setPreSecondColor}
        secondColor={secondColor}
        setSecondColor={setSecondColor}
        title={'LIA VOUCHER'}
      />



      <HorizontalBanner
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        flagIndexHasChanged={flagIndexHasChanged}
        flagSecondIndexHasChanged={flagSecondIndexHasChanged}
        preColor={preColor}
        setPreColor={setPreColor}
        preSecondColor={preSecondColor}
        setPreSecondColor={setPreSecondColor}
        secondColor={secondColor}
        setSecondColor={setSecondColor}
      />

      <HorizontalTab
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        flagIndexHasChanged={flagIndexHasChanged}
        flagSecondIndexHasChanged={flagSecondIndexHasChanged}
        preColor={preColor}
        setPreColor={setPreColor}
        preSecondColor={preSecondColor}
        setPreSecondColor={setPreSecondColor}
        secondColor={secondColor}
        setSecondColor={setSecondColor}
      />

      <ListVoucher
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        flagIndexHasChanged={flagIndexHasChanged}
        flagSecondIndexHasChanged={flagSecondIndexHasChanged}
        preColor={preColor}
        setPreColor={setPreColor}
        preSecondColor={preSecondColor}
        setPreSecondColor={setPreSecondColor}
        secondColor={secondColor}
        setSecondColor={setSecondColor}
      />

    </Animated.View>
  )
})

export default LiAVoucher

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLOR
  }
})