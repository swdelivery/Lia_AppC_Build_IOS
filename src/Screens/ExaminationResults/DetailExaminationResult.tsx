import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { styleElement } from '@Constant/StyleElement'
import LiAHeader from '@Components/Header/LiAHeader'
import BannerInfo from './Components/BannerInfo'
import MainInfo from './Components/MainInfo'
import Spacer from '@Components/Spacer'
import RecomendServices from './Components/RecomendServices'

const DetailExaminationResult = () => {

  return (
    <Screen>
      <ImageBackground
        resizeMode={"stretch"}
        style={styleElement.flex}
        source={require("../../NewImage/ExaminationResult/bgExaminationResult.png")}
      >
        <LiAHeader bg={'transparent'} safeTop title='Kết quả thăm khám' />
        <ScrollView>
          <BannerInfo />
          <MainInfo />
          <RecomendServices />

          <Spacer top={200} />
        </ScrollView>
      </ImageBackground>

    </Screen>
  )
}

export default DetailExaminationResult

const styles = StyleSheet.create({})
