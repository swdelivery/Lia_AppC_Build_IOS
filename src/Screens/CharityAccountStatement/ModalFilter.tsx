import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Row from '@Components/Row'
import { useNavigate } from 'src/Hooks/useNavigation'
import Icon from "@Components/Icon";
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { styleElement } from '@Constant/StyleElement'
import SearchInput from './ModalFilterComponents/SearchInput'
import RangeDateInput from './ModalFilterComponents/RangeDateInput'
import MultiPickerColumn from './ModalFilterComponents/MultiPickerColumn'
import Button from '@Components/Button/Button'
import { NEW_BASE_COLOR } from '@Constant/Color'
import CalendarPickSingle from '@Components/CalendarPickSingle/CalendarPickSingle'
import useVisible from 'src/Hooks/useVisible'
import NewDatePicker from '@Components/NewDatePicker/NewDatePicker'
import moment from 'moment'

const ModalFilter = () => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()

  const [dataType, setDataType] = useState([
    { name: "Chuyển khoản", code: 'CK' },
    { name: "Trích hoá đơn dịch vụ", code: 'HD' },
    { name: "Khác", code: 'KHAC' },
  ])
  const [choicedDataType, setChoicedDataType] = useState([])

  const [dataMoney, setDataMoney] = useState([
    { name: "< 200.000", code: '1' },
    { name: "Từ 200.000 - 1.000.000", code: '2' },
    { name: "Từ 1.000.000 - 10.000.000", code: '3' },
    { name: "Lớn hơn 10.000.000", code: '4' },
  ])
  const [choicedDataMoney, setChoicedDataMoney] = useState([])

  const calendarPickerFrom = useVisible()
  const calendarPickerTo = useVisible()

  const [valueTimeFrom, setValueTimeFrom] = useState(null)
  const [valueTimeTo, setValueTimeTo] = useState(null)

  const _handleConfirmPickDateFrom = useCallback((date) => {
    setValueTimeFrom(moment(date))
  }, []);
  const _handleConfirmPickDateTo = useCallback((date) => {
    setValueTimeTo(moment(date))
  }, []);

  const _handleChangeType = useCallback((data) => {
    let arrTemp = [...choicedDataType];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setChoicedDataType(arrTemp)
  }, [choicedDataType])

  const _handleChangeMoney = useCallback((data) => {
    let arrTemp = [...choicedDataMoney];
    let indexFinded = arrTemp?.findIndex(item => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setChoicedDataMoney(arrTemp)
  }, [choicedDataMoney])

  const _handleChangeToInitialState = useCallback(() => {
    setChoicedDataType([])
    setChoicedDataMoney([])
    setValueTimeFrom(null)
    setValueTimeTo(null)
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
          valueTimeFrom={valueTimeFrom}
          valueTimeTo={valueTimeTo}
          calendarPickerFrom={calendarPickerFrom}
          calendarPickerTo={calendarPickerTo} />

        <MultiPickerColumn
          onChange={_handleChangeType}
          choiced={choicedDataType}
          title="Loại giao dịch"
          data={dataType}
        />
        <MultiPickerColumn
          onChange={_handleChangeMoney}
          choiced={choicedDataMoney}
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
          onPress={() => { }}
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
        minDate={moment(valueTimeFrom)}
        visible={calendarPickerTo.visible}
        onClose={calendarPickerTo.hide} />

    </Screen>
  )
}

export default ModalFilter

const styles = StyleSheet.create({})
