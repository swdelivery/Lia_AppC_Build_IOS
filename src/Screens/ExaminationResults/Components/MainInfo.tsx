import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import CountStar2 from '@Components/NewCountStar/CountStar'
import { LocationIcon } from "src/SGV";
import Row from '@Components/Row'
import Avatar from '@Components/Avatar'
import DoctorInfo from './DoctorInfo'
import Spacer from '@Components/Spacer'
import PatientInfo from './PatientInfo'
import ReasonInfo from './ReasonInfo'
import SolutionInfo from './SolutionInfo'

const MainInfo = () => {
  return (
    <Column
      paddingVertical={8 * 3}
      gap={8 * 4}
      backgroundColor={WHITE}>

      <DoctorInfo />
      <PatientInfo />
      <ReasonInfo />
      <SolutionInfo />

    </Column>
  )
}

export default MainInfo

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 6,
    height: 8 * 6,
  }
})
