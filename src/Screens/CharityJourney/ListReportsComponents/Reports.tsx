import CardReportGroupByDate from '@Components/Charity/CardReportGroupByDate'
import Column from '@Components/Column'
import Row from '@Components/Row'
import Spacer from '@Components/Spacer'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { StyleSheet } from 'react-native'

const Reports = () => {
  return (
    <Column margin={8 * 2}>
      <Row gap={4}>
        <Text weight='bold'>Chi tiết các khoản chi theo ngày</Text>
        <Text weight='bold' color={NEW_BASE_COLOR}>(4)</Text>
      </Row>
      <Spacer top={8 * 2} />
      <Column gap={8 * 2}>
        <CardReportGroupByDate />
        <CardReportGroupByDate />
        <CardReportGroupByDate />
      </Column>
    </Column>
  )
}

export default Reports

const styles = StyleSheet.create({})
