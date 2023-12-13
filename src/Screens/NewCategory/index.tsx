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

const WIDTH_IMAGE_SERVICE = ((_width - 80) / 2) - 8 * 2

const NewCategory = () => {
  const dispatch = useDispatch()
  const { data: dataService } = useSelector(getServiceListState);

  const { data: dataBranch, getData: getDataBranch } = useListFilter(
    getBranchListState,
    getBranchList,
  );
  const { data: dataDoctor, getData: getDataDoctor } = useListFilter(
    getDoctorListState,
    getDoctorList,
  );
  const { data: dataPractitioner, getData: getDataPractitioner } = useListFilter(
    getPractitionerListState,
    getPractitionerList,
  );
  const { data: dataMaterial, getData: getDataMaterial } = useListFilter(
    getMaterialListState,
    getMaterialList,
  );

  const [categoryChoice, setCategoryChoice] = useState('service')

  useEffect(() => {
    if (categoryChoice == 'service') {
      dispatch(getServices.request());
    }
    if (categoryChoice == 'branch') {
      getDataBranch()
    }
    if (categoryChoice == 'doctor') {
      getDataDoctor()
    }
    if (categoryChoice == 'practitioner') {
      getDataPractitioner()
    }
    if (categoryChoice == 'material') {
      getDataMaterial()
    }
  }, [categoryChoice])


  const BtnCategory = ({ title = '', isActive = false, flag = "" }) => {
    const _handleChoiceCategory = () => {
      setCategoryChoice(flag)
    }
    return (
      <TouchableOpacity onPress={_handleChoiceCategory}>
        <Text
          color={isActive ? BASE_COLOR : BLACK}
          textDecorationLine={isActive ? 'underline' : 'none'}
          weight={isActive ? 'bold' : 'regular'}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  const BtnFilter = ({ title = '', isActive = false }) => {
    return (
      <TouchableOpacity>
        <Text
          color={WHITE}
          weight={isActive ? 'bold' : 'regular'}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  const BtnMenu = ({ title = '', isActive = false }) => {
    return (
      <TouchableOpacity>
        <Column
          padding={8 * 2}
          backgroundColor={isActive ? WHITE : BG_BEAUTY}>
          <Text
            size={12}
            color={BLACK}
            weight={isActive ? 'bold' : 'regular'}>
            {title}
          </Text>
        </Column>
      </TouchableOpacity>
    )
  }

  const _renderItemService = ({ item, index }) => {
    return (
      <ItemService data={item} />
    )
  }
  const _renderItemBranch = ({ item, index }) => {
    return (
      <ItemBranch data={item} />
    )
  }
  const _renderItemDoctor = ({ item, index }) => {
    return (
      <ItemDoctor data={item} />
    )
  }
  const _renderItemPractitioner = ({ item, index }) => {
    return (
      <ItemPractitioner data={item} />
    )
  }
  const _renderItemMaterial = ({ item, index }) => {
    return (
      <ItemMaterial data={item} />
    )
  }

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar
        barStyle="dark-content" />
      <LiAHeader
        bg={WHITE}
        titleColor={BASE_COLOR}
        safeTop
        title='Danh sách dịch vụ' />
      <Row
        marginTop={0}
        borderRadius={8}
        borderWidth={1}
        borderColor={BORDER_COLOR}
        padding={8 * 2}
        paddingVertical={8}
        gap={8}
        margin={8 * 2}>
        <IconFindGrey style={sizeIcon.md} />
        <TextInput

          style={{ flex: 1, paddingVertical: 0 }}
          placeholder='Nhập thông tin tìm kiếm' />
        <IconCamera
          width={8 * 2.5}
          height={8 * 2.5}
          style={[{ opacity: .5 }]} />
      </Row>
      <Row
        justifyContent='space-between'
        marginHorizontal={8 * 2}>
        <BtnCategory flag='service' isActive={categoryChoice == "service"} title='Dịch vụ' />
        <BtnCategory flag='branch' isActive={categoryChoice == "branch"} title='Phòng khám' />
        <BtnCategory flag='doctor' isActive={categoryChoice == "doctor"} title='Bác sĩ' />
        <BtnCategory flag='practitioner' isActive={categoryChoice == "practitioner"} title='Chuyên viên' />
        <BtnCategory flag='material' isActive={categoryChoice == "material"} title='Vật liệu' />
      </Row>
      <HorizontalLine style={styles.horizontalLine} />
      <Row
        paddingVertical={8}
        justifyContent='space-between'
        paddingHorizontal={8 * 2}
        backgroundColor={BASE_COLOR}>
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
            <BtnMenu title='Da' />
            <BtnMenu title='Mắt' />
            <BtnMenu title='Mũi' />
            <BtnMenu title='Môi' />
            <BtnMenu title='Hàm mặt' />
            <BtnMenu title='Nha Khoa' />
            <BtnMenu title='Filler' />
            <BtnMenu title='Botox' />
            <BtnMenu title='Ngực' />
            <BtnMenu title='Định hình cơ thể' />
            <BtnMenu title='Cấy mỡ' />
            <BtnMenu title='Phun xăm điêu khắc' />
            <BtnMenu title='Vùng kín' />
            <BtnMenu title='Triệt lông' />
            <BtnMenu title='Cấy tóc/Chăm sóc tóc' />
            <BtnMenu title='Spa/Massage' />
          </ScrollView>
        </Column>

        {/* RIGHT RESULT */}
        {
          categoryChoice == 'service' ?
            <Column
              flex={1}
              alignItems='center'>
              <FlatList
                contentContainerStyle={{ justifyContent: 'space-between', paddingVertical: 8 }}
                renderItem={_renderItemService}
                keyExtractor={(item, index) => item?.id}
                numColumns={2}
                data={dataService} />
            </Column>
            : <></>
        }
        {
          categoryChoice == 'branch' ?
            <Column
              flex={1}>
              <FlatList
                renderItem={_renderItemBranch}
                keyExtractor={(item, index) => item?.id}
                data={dataBranch} />
            </Column>
            : <></>
        }
        {
          categoryChoice == 'doctor' ?
            <Column
              flex={1}>
              <FlatList
                renderItem={_renderItemDoctor}
                keyExtractor={(item, index) => item?.id}
                data={dataDoctor} />
            </Column>
            : <></>
        }
        {
          categoryChoice == 'practitioner' ?
            <Column
              flex={1}>
              <FlatList
                renderItem={_renderItemPractitioner}
                keyExtractor={(item, index) => item?.id}
                data={dataPractitioner} />
            </Column>
            : <></>
        }
        {
          categoryChoice == 'material' ?
            <Column
              flex={1}
              alignItems='center'>
              <FlatList
                contentContainerStyle={{ justifyContent: 'space-between', paddingVertical: 8 }}
                renderItem={_renderItemMaterial}
                keyExtractor={(item, index) => item?.id}
                numColumns={2}
                data={dataMaterial} />
            </Column>
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
