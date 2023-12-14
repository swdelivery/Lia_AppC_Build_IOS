import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { BG_BEAUTY } from '@Constant/Color'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import useVisible from 'src/Hooks/useVisible'
import BtnCategory from './Components/BtnCategory'
import BtnFilter from './Components/BtnFilter'
import BtnMenu from './Components/BtnMenu'
import Header from './Components/Header'
import ResultBranch from './Components/ResultBranch'
import ResultDoctor from './Components/ResultDoctor'
import ResultMaterial from './Components/ResultMaterial'
import ResultPractitioner from './Components/ResultPractitioner'
import ResultService from './Components/ResultService'
import ModalFilter from './ModalFilter'
import { IconExpand, IconFilter, IconSort } from '@Components/Icon/Icon'
import BtnPopover from './Components/BtnPopover'
import { useSelector } from 'react-redux'
import { getServiceGroupState } from '@Redux/home/selectors'
import ListServiceGroup from './Components/ListServiceGroup'


const NewCategory = () => {
  const [categoryChoice, setCategoryChoice] = useState('service');
  const visibleModalFilter = useVisible()

  const _handleChoiceCategory = (flag) => {
    setCategoryChoice(flag)
  }

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar
        barStyle="dark-content" />
      <Header />
      <Row
        justifyContent='space-between'
        marginHorizontal={8 * 2}>
        <BtnCategory onPress={_handleChoiceCategory} flag='service' isActive={categoryChoice == "service"} title='Dịch vụ' />
        <BtnCategory onPress={_handleChoiceCategory} flag='branch' isActive={categoryChoice == "branch"} title='Phòng khám' />
        <BtnCategory onPress={_handleChoiceCategory} flag='doctor' isActive={categoryChoice == "doctor"} title='Bác sĩ' />
        <BtnCategory onPress={_handleChoiceCategory} flag='practitioner' isActive={categoryChoice == "practitioner"} title='Chuyên viên' />
        <BtnCategory onPress={_handleChoiceCategory} flag='material' isActive={categoryChoice == "material"} title='Vật liệu' />
      </Row>
      <HorizontalLine style={styles.horizontalLine} />
      <Row
        paddingVertical={8}
        justifyContent='space-between'
        paddingHorizontal={8 * 2}
        backgroundColor={"#366792"}>

        <BtnPopover
          icon={<IconExpand
            width={8 * 1.5}
            height={8 * 1.5} />}
          isActive
          title='Giới thiệu' />

        <BtnFilter title='Phổ biến nhất' />

        <BtnFilter
          icon={<IconSort
            width={8 * 1.5}
            height={8 * 1.5} />}
          title='Giá' />

        <BtnFilter
          icon={<IconFilter
            width={8 * 1.5}
            height={8 * 1.5} />}
          onPress={visibleModalFilter.show}
          title='Bộ lọc' />
      </Row>

      <Row flex={1}>
        {/* LEFT MENU */}
        <ListServiceGroup />

        {/* RIGHT RESULT */}
        {
          categoryChoice == 'service' ?
            <ResultService />
            : <></>
        }
        {
          categoryChoice == 'branch' ?
            <ResultBranch />
            : <></>
        }
        {
          categoryChoice == 'doctor' ?
            <ResultDoctor />
            : <></>
        }
        {
          categoryChoice == 'practitioner' ?
            <ResultPractitioner />
            : <></>
        }
        {
          categoryChoice == 'material' ?
            <ResultMaterial />
            : <></>
        }
      </Row>

      <ModalFilter
        onClose={visibleModalFilter.hide}
        visible={visibleModalFilter.visible} />

    </Screen>
  )
}

export default NewCategory

const styles = StyleSheet.create({
  horizontalLine: {
    backgroundColor: "#C8CCD9",
    height: 4,
    marginTop: 8 * 2
  }
})
