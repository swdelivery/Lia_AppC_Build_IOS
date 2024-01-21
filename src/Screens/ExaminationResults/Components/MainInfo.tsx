import Column from '@Components/Column'
import { WHITE } from '@Constant/Color'
import React from 'react'
import DoctorInfo from './DoctorInfo'
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
