import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import ModalBottom from '@Components/ModalBottom/ModalBottom'
import CalendarPicker from 'react-native-calendar-picker';
import { stylesFont } from '@Constant/Font';
import { BASE_COLOR, BG_GREY_OPACITY_5, GREY, NEW_BASE_COLOR, RED, THIRD_COLOR, WHITE } from '@Constant/Color';
import { _height, _moderateScale, _width } from '@Constant/Scale';
import Spacer from '@Components/Spacer';
import Row from '@Components/Row';
import Button from '@Components/Button/Button';
import Column from '@Components/Column';
import moment from 'moment';
import { styleElement } from '@Constant/StyleElement';
import Icon from '@Components/Icon';

type Props = {
  visible: any;
  minDate?: any;
  maxDate?: any;
  selectedStartDate?: any;
  selectedEndDate?: any;
  onConfirm: (data) => void;
}

const CalendarPickRange = ({
  visible,
  minDate,
  maxDate,
  selectedStartDate,
  selectedEndDate,
  onConfirm
}: Props) => {
  const requestCloseModalRef = useRef<any>(null)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const _handleCloseModal = useCallback(() => {
    if (requestCloseModalRef.current) {
      requestCloseModalRef.current.requestCloseModal()
    }
  }, [])

  const _handleOnClosed = useCallback(() => {
    visible.hide()
    setStartDate(null)
    setEndDate(null)
  }, [])

  const onDateChange = useCallback((date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date?._d);
    } else {
      setStartDate(date?._d);
      setEndDate(null)
    }
  }, [startDate, endDate])

  const _handleConfirm = useCallback(() => {
    onConfirm({ startDate, endDate })
    _handleCloseModal()
  }, [startDate, endDate])

  const canConfirm = useMemo(() => {
    return (startDate && endDate)
  }, [startDate, endDate])

  return (
    <ModalBottom
      ref={requestCloseModalRef}
      borderBottomWidth={0}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={_handleOnClosed}
      heightModal={510}
      visible={visible.visible} >
      <Spacer top={8 * 3} />

      <CalendarPicker
        minDate={minDate ? minDate : null}
        maxDate={maxDate ? maxDate : null}
        onDateChange={onDateChange}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        allowRangeSelection={true}
        allowBackwardRangeSelect={true}
        previousTitle={"Trước"}
        nextTitle={"Sau"}
        weekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
        months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
        selectedDayColor={NEW_BASE_COLOR}
        selectedRangeStyle={{ backgroundColor: 'rgba(54, 103, 146,.5)' }}
        selectedRangeStartStyle={{ backgroundColor: BASE_COLOR }}
        selectedRangeEndStyle={{ backgroundColor: BASE_COLOR }}
        selectedDayTextColor={WHITE}
        selectedDayTextStyle={[stylesFont.fontDinTextProBold]}
        textStyle={[stylesFont.fontDinTextPro]}
        todayBackgroundColor={'#ccc'}
        todayTextStyle={[stylesFont.fontDinTextPro, { color: WHITE }]}
        // scrollable
        enableSwipe
        selectMonthTitle={"Chọn tháng trong năm "}
        selectYearTitle={"Chọn năm"}
        dayLabelsWrapper={{
          borderTopWidth: 0,
          borderBottomWidth: _moderateScale(0.5),
          borderBottomColor: BG_GREY_OPACITY_5
        }}
        height={_height - 8 * 3}
        width={_width - 8 * 3} />

      <Row
        gap={8 * 4}
        justifyContent='center'
        marginHorizontal={8 * 6}
        marginTop={8 * 4}>
        <Column gap={8} alignItems='center'>
          <Text>
            Ngày bắt đầu
          </Text>
          {
            startDate !== null ?
              <Text>
                {moment(startDate).format('DD/MM/YYYY')}
              </Text>
              :
              <Text>
                Chưa chọn
              </Text>
          }
        </Column>
        <Icon name='arrow-right' />
        <Column gap={8} alignItems='center'>
          <Text>
            Ngày kết thúc
          </Text>
          {
            endDate !== null ?
              <Text>
                {moment(endDate).format('DD/MM/YYYY')}
              </Text>
              :
              <Text>
                Chưa chọn
              </Text>
          }
        </Column>
      </Row>

      <View style={styleElement.flex} />

      <Row
        marginVertical={8 * 2}
        paddingHorizontal={8 * 2}
        gap={8 * 2}>
        <Column width={120}>
          <Button.Custom
            titleSize={14}
            bgColor={"#F2F2F5"}
            colorText={GREY}
            title={`Đóng`}
            onPress={_handleCloseModal}
            height={40}
          />
        </Column>
        <Button.Gradient
          disabled={!canConfirm}
          titleSize={14}
          containerStyle={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[NEW_BASE_COLOR, NEW_BASE_COLOR]}
          title={`Xác nhận`}
          onPress={_handleConfirm}
          height={40}
        />
      </Row>


    </ModalBottom>
  )
}

export default CalendarPickRange

const styles = StyleSheet.create({})
