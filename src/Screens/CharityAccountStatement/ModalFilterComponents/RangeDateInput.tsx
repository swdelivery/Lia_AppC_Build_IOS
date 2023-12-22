import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR } from '@Constant/Color'
import Icon from "@Components/Icon";
import { styleElement } from '@Constant/StyleElement'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { getDataFilterReportState } from '@Redux/charity/selectors'

type Props = {
  calendarPickerFrom: any;
  calendarPickerTo: any;
};

const RangeDateInput = ({ calendarPickerFrom, calendarPickerTo }: Props) => {
  const { dateFrom, dateTo } = useSelector(getDataFilterReportState)

  return (
    <Column
      gap={8}
      marginTop={8 * 2}
      paddingHorizontal={8 * 2}>
      <Text
        weight='bold'>
        Ngày giao dịch
      </Text>

      <Row
        gap={8 * 2}>
        <Row
          onPress={calendarPickerFrom.show}
          paddingHorizontal={8 * 2}
          paddingRight={8}
          borderWidth={1}
          borderColor={BORDER_COLOR}
          borderRadius={8}
          height={8 * 6}
          flex={1}>
          {
            dateFrom ?
              <Text
                weight='bold'
                color={NEW_BASE_COLOR}
                style={styleElement.flex}>
                {moment(dateFrom).format('DD/MM/YYYY')}
              </Text>
              :
              <Text style={styleElement.flex}>
                Ngày bắt đầu
              </Text>
          }

          <Icon name="calendar" size={24} color={GREY} />
        </Row>

        <Row
          onPress={calendarPickerTo.show}
          paddingHorizontal={8 * 2}
          paddingRight={8}
          borderWidth={1}
          borderColor={BORDER_COLOR}
          borderRadius={8}
          height={8 * 6}
          flex={1}>
          {
            dateTo ?
              <Text
                weight='bold'
                color={NEW_BASE_COLOR}
                style={styleElement.flex}>
                {moment(dateTo).format('DD/MM/YYYY')}
              </Text>
              :
              <Text style={styleElement.flex}>
                Ngày kết thúc
              </Text>
          }
          <Icon name="calendar" size={24} color={GREY} />
        </Row>
      </Row>
    </Column>
  )
}

export default RangeDateInput

const styles = StyleSheet.create({})
