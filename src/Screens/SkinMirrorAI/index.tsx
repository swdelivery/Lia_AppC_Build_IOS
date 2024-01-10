import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Screen from '@Components/Screen'
import { ImageBackground } from 'react-native'
import { styleElement } from '@Constant/StyleElement'
import OverlayAnimation from './Components/OverlayAnimation'
import ViewShot from "react-native-view-shot";
import { _height, _width } from '@Constant/Scale'
import MainResult from './MainResult'

const SkinMirrorAI = () => {
  const refViewShot = useRef();

  const [onReadyCapture, setOnReadyCapture] = useState(false)
  const [imageCapture, setImageCapture] = useState(null)

  useEffect(() => {
    if (onReadyCapture) {
      refViewShot?.current?.capture().then(uri => {
        console.log("do something with ", uri);
        setImageCapture(uri)
      });
    }
  }, [onReadyCapture])

  return (

    <Screen style={{ flex: 1 }}>
      {
        imageCapture ?
          <MainResult imageCapture={imageCapture} />
          // <View style={styleElement.flex}>
          //   <Image
          //     style={{
          //       width: _width,
          //       height: _height,
          //       position: 'absolute',
          //       zIndex: 1
          //     }}
          //     source={{ uri: imageCapture }} />
          // </View>
          :
          <ViewShot style={{ flex: 1 }} ref={refViewShot} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
            <ImageBackground
              style={styleElement.flex}
              source={require('../../Image/demoSkinAI/demo.png')}>
              <OverlayAnimation onEndAnim={setOnReadyCapture} />
            </ImageBackground>
          </ViewShot>
      }


    </Screen>

  )
}

export default SkinMirrorAI

const styles = StyleSheet.create({})
