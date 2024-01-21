import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { getDetailExaminationResult } from '@Redux/examinationResults/actions'
import React, { useEffect } from 'react'
import { ImageBackground, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigationParams } from "src/Hooks/useNavigation"
import BannerInfo from './Components/BannerInfo'
import MainInfo from './Components/MainInfo'
import RecomendServices from './Components/RecomendServices'

type ScreenKey = typeof ScreenKey.DETAIL_EXAMINATION_RESULT;

const DetailExaminationResult = () => {
  const dispatch = useDispatch()
  const { _id } = useNavigationParams<ScreenKey>();

  useEffect(() => {
    if (_id) {
      dispatch(getDetailExaminationResult.request(_id))
    }
  }, [_id])

  return (
    <Screen>
      <ImageBackground
        resizeMode={"stretch"}
        style={styleElement.flex}
        source={require("../../NewImage/ExaminationResult/bgExaminationResult.png")}>
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
