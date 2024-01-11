import Column from '@Components/Column'
import { IconBackWhite } from '@Components/Icon/Icon'
import Screen from '@Components/Screen'
import { BLACK_OPACITY_4 } from '@Constant/Color'
import { _height, _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React, { useEffect, useRef, useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ViewShot from "react-native-view-shot"
import { useNavigate } from 'src/Hooks/useNavigation'
import OverlayAnimation from './Components/OverlayAnimation'
import MainResult from './MainResult'

const SkinMirrorAI = () => {
  const { top } = useSafeAreaInsets()
  const refViewShot = useRef();
  const { navigation } = useNavigate()
  const [onReadyCapture, setOnReadyCapture] = useState(false)
  const [imageCapture, setImageCapture] = useState(null)
  const [startFristAnim, setStartFristAnim] = useState(true)

  useEffect(() => {
    if (onReadyCapture) {
      refViewShot?.current?.capture().then(uri => {
        setImageCapture(uri)
      });
    }
  }, [onReadyCapture])

  useEffect(() => {
    if (imageCapture) {
      setTimeout(() => {
        setStartFristAnim(false)
      }, 500);
    }
  }, [imageCapture])

  return (

    <Screen style={{ flex: 1 }}>

      {
        imageCapture ?
          <Column
            onPress={navigation.goBack}
            backgroundColor={BLACK_OPACITY_4}
            top={top + 20}
            borderRadius={8 * 10}
            left={20}
            zIndex={100}
            position="absolute">
            <IconBackWhite />
          </Column>
          : <></>
      }

      {
        imageCapture ?
          <MainResult imageCapture={imageCapture} />
          :
          <></>
      }
      {
        startFristAnim ?
          <ViewShot style={{ width: _width, height: _height, position: 'absolute', zIndex: -1 }} ref={refViewShot} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
            <ImageBackground
              style={styleElement.flex}
              source={require('../../Image/demoSkinAI/demo.png')}>
              <OverlayAnimation onEndAnim={setOnReadyCapture} />
            </ImageBackground>
          </ViewShot>
          : <></>
      }
    </Screen>

  )
}

export default SkinMirrorAI

const styles = StyleSheet.create({})
