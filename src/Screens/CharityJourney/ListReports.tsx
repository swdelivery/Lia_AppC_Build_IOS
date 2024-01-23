import Icon from '@Components/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Header from './Components/Header'
import Info from './ListReportsComponents/Info'
import Reports from './ListReportsComponents/Reports'

const ListReports = () => {
  return (
    <Screen>
      <Header title='Báo cáo phân phối nguồn ủng hộ' />
      <ScrollView>
        <Row gap={4} margin={8 * 2}>
          <Icon color={NEW_BASE_COLOR} name='target' />
          <Text weight='bold' color={NEW_BASE_COLOR}>
            Đặt mục tiêu 10 nhà vệ sinh trong 2 tháng cuối năm 2023
          </Text>
        </Row>
        <Info />
        <HorizontalLine height={4} />
        <Reports />
      </ScrollView>
    </Screen>
  )
}

export default ListReports

const styles = StyleSheet.create({})
