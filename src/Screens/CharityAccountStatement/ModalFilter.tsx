import Button from '@Components/Button/Button'
import Icon from "@Components/Icon"
import NewDatePicker from '@Components/NewDatePicker/NewDatePicker'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'
import useVisible from 'src/Hooks/useVisible'
import MultiPickerColumn from './ModalFilterComponents/MultiPickerColumn'
import RangeDateInput from './ModalFilterComponents/RangeDateInput'
import SearchInput from './ModalFilterComponents/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import { selectDateFrom, selectDateTo, selectDeposit, selectIdVolunteer, selectPaymentMethod, selectSearchValue } from '@Redux/charity/actions'
import { getDataFilterReportState, getDetailCampainState } from '@Redux/charity/selectors'

const ModalFilter = () => {
  const { navigation } = useNavigate()
  const dispatch = useDispatch()
  const { dateFrom, paymentMethodCode, depositAmount } = useSelector(getDataFilterReportState)
  const { data: { _id: idVolunteer } } = useSelector(getDetailCampainState)

  useEffect(() => {
    if (idVolunteer) {
      dispatch(selectIdVolunteer(idVolunteer))
    }
  }, [idVolunteer])

  const [dataType, setDataType] = useState([
    { name: "Chuyển khoản", code: 'BANK_TRANSFER' },
    { name: "Trích hoá đơn dịch vụ", code: 'SERVICE_EXCERPT' },
    { name: "Khác", code: 'OTHER' },
  ])

  const [dataMoney, setDataMoney] = useState([
    { name: "< 200.000", code: 'OPTION_1', data: { from: 0, to: 200000 } },
    { name: "Từ 200.000 - 1.000.000", code: 'OPTION_2', data: { from: 200000, to: 1000000 } },
    { name: "Từ 1.000.000 - 10.000.000", code: 'OPTION_3', data: { from: 1000000, to: 10000000 } },
    { name: "Lớn hơn 10.000.000", code: '4', data: { from: 10000000, to: 1000000000 } },
  ])

  const calendarPickerFrom = useVisible()
  const calendarPickerTo = useVisible()

  const _handleConfirmPickDateFrom = useCallback((date) => {
    dispatch(selectDateFrom(moment(date)))
  }, []);
  const _handleConfirmPickDateTo = useCallback((date) => {
    dispatch(selectDateTo(moment(date)))
  }, []);

  const _handleChangeType = useCallback((data) => {
    let arrTemp = [...paymentMethodCode];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    dispatch(selectPaymentMethod(arrTemp))
  }, [paymentMethodCode])

  const _handleChangeMoney = useCallback((data) => {
    let arrTemp = [...depositAmount];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp = [data]
    }
    dispatch(selectDeposit(arrTemp))
  }, [depositAmount])

  const _handleChangeToInitialState = useCallback(() => {
    dispatch(selectSearchValue(''))
    dispatch(selectDateFrom(''))
    dispatch(selectDateTo(''))
    dispatch(selectPaymentMethod([]))
    dispatch(selectDeposit([]))
  }, [])

  const _handleGoResultFilter = useCallback(() => {
    navigation.navigate(ScreenKey.CHARITY_RESULT_FILTER_CASH_FLOW)
  }, [])

  return (
    <Screen
      safeBottom
      safeTop>
      <FocusAwareStatusBar barStyle='dark-content' />
      <Row
        marginVertical={8 * 2}
        gap={8 * 2}
        paddingHorizontal={8 * 2}>
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={navigation.goBack}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
        <Text weight='bold'>Bộ lọc</Text>
      </Row>
      <ScrollView>
        <SearchInput />

        <RangeDateInput
          calendarPickerFrom={calendarPickerFrom}
          calendarPickerTo={calendarPickerTo} />

        <MultiPickerColumn
          onChange={_handleChangeType}
          choiced={paymentMethodCode}
          title="Loại giao dịch"
          data={dataType}
        />
        <MultiPickerColumn
          onChange={_handleChangeMoney}
          choiced={depositAmount}
          title="Số tiền"
          data={dataMoney}
        />

      </ScrollView>
      <Row paddingHorizontal={16} paddingVertical={8} gap={8 * 2}>
        <Button.Outline
          onPress={_handleChangeToInitialState}
          flex={1}
          title="Thiết lập lại"
          borderColor={NEW_BASE_COLOR}
          titleColor={NEW_BASE_COLOR}
          titleSize={16}
          height={40}
          borderRadius={12}
        />
        <Button.Gradient
          onPress={_handleGoResultFilter}
          title="Áp dụng"
          titleSize={16}
          height={40}
          flex={1}
          borderRadius={12}
          horizontal
          colors={["#1a3e67", "#34759b"]}
        />
      </Row>

      <NewDatePicker
        selectedDayColor={NEW_BASE_COLOR}
        colors={["#34759b", "#1a3e67"]}
        onConfirm={_handleConfirmPickDateFrom}
        maxDate={moment()}
        visible={calendarPickerFrom.visible}
        onClose={calendarPickerFrom.hide} />

      <NewDatePicker
        selectedDayColor={NEW_BASE_COLOR}
        colors={["#34759b", "#1a3e67"]}
        onConfirm={_handleConfirmPickDateTo}
        maxDate={moment()}
        minDate={moment(dateFrom)}
        visible={calendarPickerTo.visible}
        onClose={calendarPickerTo.hide} />

    </Screen>
  )
}

export default ModalFilter

const styles = StyleSheet.create({})
