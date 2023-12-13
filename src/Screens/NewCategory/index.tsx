import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconCamera, IconFindGrey } from '@Components/Icon/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BASE_COLOR, BG_BEAUTY, BLACK, BORDER_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _width } from '@Constant/Scale'
import { getBranchList } from '@Redux/branch/actions'
import { getBranchListState } from '@Redux/branch/selectors'
import { getDoctorList } from '@Redux/doctor/actions'
import { getDoctorListState } from '@Redux/doctor/selectors'
import { getMaterialList } from '@Redux/material/actions'
import { getMaterialListState } from '@Redux/material/selectors'
import { getPractitionerList } from '@Redux/practitioner/actions'
import { getPractitionerListState } from '@Redux/practitioner/selectors'
import { getServices } from '@Redux/service/actions'
import { getServiceListState } from '@Redux/service/selectors'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useListFilter from 'src/Hooks/useListFilter'
import ItemBranch from './Components/ItemBranch'
import ItemDoctor from './Components/ItemDoctor'
import ItemMaterial from './Components/ItemMaterial'
import ItemPractitioner from './Components/ItemPractitioner'
import ItemService from './Components/ItemService'
import BtnCategory from './Components/BtnCategory'
import BtnMenu from './Components/BtnMenu'
import BtnFilter from './Components/BtnFilter'
import ResultService from './Components/ResultService'
import ResultBranch from './Components/ResultBranch'
import ResultDoctor from './Components/ResultDoctor'
import ResultPractitioner from './Components/ResultPractitioner'
import ResultMaterial from './Components/ResultMaterial'
import Header from './Components/Header'

const WIDTH_IMAGE_SERVICE = ((_width - 80) / 2) - 8 * 2

const NewCategory = () => {
  const [categoryChoice, setCategoryChoice] = useState('service');
  const [menuChoice, setMenuChoice] = useState('');


  const _handleChoiceCategory = (flag) => {
    setCategoryChoice(flag)
  }
  const _handleChoiceMenu = (flag) => {
    setMenuChoice(flag)
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
        <BtnFilter isActive title='Giới thiệu' />
        <BtnFilter title='Phổ biến nhất' />
        <BtnFilter title='Giá' />
        <BtnFilter title='Bộ lọc' />
      </Row>

      <Row flex={1}>
        {/* LEFT MENU */}
        <Column
          backgroundColor={BG_BEAUTY}
          width={80}>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <BtnMenu onPress={_handleChoiceMenu} flag='da' isActive={menuChoice == 'da'} title='Da' />
            <BtnMenu onPress={_handleChoiceMenu} flag='mat' isActive={menuChoice == 'mat'} title='Mắt' />
            <BtnMenu onPress={_handleChoiceMenu} flag='mui' isActive={menuChoice == 'mui'} title='Mũi' />
            <BtnMenu onPress={_handleChoiceMenu} flag='moi' isActive={menuChoice == 'moi'} title='Môi' />
            <BtnMenu onPress={_handleChoiceMenu} flag='ham-mat' isActive={menuChoice == 'ham-mat'} title='Hàm mặt' />
            <BtnMenu onPress={_handleChoiceMenu} flag='nha-khoa' isActive={menuChoice == 'nha-khoa'} title='Nha Khoa' />
            <BtnMenu onPress={_handleChoiceMenu} flag='filler' isActive={menuChoice == 'filler'} title='Filler' />
            <BtnMenu onPress={_handleChoiceMenu} flag='botox' isActive={menuChoice == 'botox'} title='Botox' />
            <BtnMenu onPress={_handleChoiceMenu} flag='nguc' isActive={menuChoice == 'nguc'} title='Ngực' />
            <BtnMenu onPress={_handleChoiceMenu} flag='dinh-hinh' isActive={menuChoice == 'dinh-hinh'} title='Định hình cơ thể' />
            <BtnMenu onPress={_handleChoiceMenu} flag='cay-mo' isActive={menuChoice == 'cay-mo'} title='Cấy mỡ' />
            <BtnMenu onPress={_handleChoiceMenu} flag='phun-xam' isActive={menuChoice == 'phun-xam'} title='Phun xăm điêu khắc' />
            <BtnMenu onPress={_handleChoiceMenu} flag='vung-kin' isActive={menuChoice == 'vung-kin'} title='Vùng kín' />
            <BtnMenu onPress={_handleChoiceMenu} flag='triet-long' isActive={menuChoice == 'triet-long'} title='Triệt lông' />
            <BtnMenu onPress={_handleChoiceMenu} flag='cay-toc' isActive={menuChoice == 'cay-toc'} title='Cấy tóc/Chăm sóc tóc' />
            <BtnMenu onPress={_handleChoiceMenu} flag='spa' isActive={menuChoice == 'spa'} title='Spa/Massage' />
          </ScrollView>
        </Column>

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
