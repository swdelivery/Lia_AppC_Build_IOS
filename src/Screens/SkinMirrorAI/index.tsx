import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@Components/Screen'
import { ImageBackground } from 'react-native'
import { styleElement } from '@Constant/StyleElement'
import OverlayAnimation from './Components/OverlayAnimation'

const SkinMirrorAI = () => {
  return (
    <Screen style={{ flex: 1 }}>

      <ImageBackground
        style={styleElement.flex}
        source={require('../../Image/demoSkinAI/demo.png')}>
        <OverlayAnimation />

      </ImageBackground>
    </Screen>
  )
}

export default SkinMirrorAI

const styles = StyleSheet.create({})
