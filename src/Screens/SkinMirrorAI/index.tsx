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
        source={{ uri: `https://i.ibb.co/P6Y54RQ/A-nh-ma-n-hi-nh-2024-01-10-lu-c-13-01-11.png` }}>

        <OverlayAnimation />

      </ImageBackground>
    </Screen>
  )
}

export default SkinMirrorAI

const styles = StyleSheet.create({})
