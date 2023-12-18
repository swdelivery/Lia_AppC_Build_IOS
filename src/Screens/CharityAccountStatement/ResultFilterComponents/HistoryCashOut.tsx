import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import React from 'react'
import { StyleSheet } from 'react-native'
import CardCash from '../Components/CardCash'

const HistoryCashOut = () => {
  return (
    <Column gap={8 * 2}>
      <Column>
        <Row
          margin={8 * 2}
          justifyContent='space-between'>
          <Text weight='bold'>
            Ngày 18 tháng 12
          </Text>
          <Text>
            1 Giao dịch
          </Text>
        </Row>
        <Column
          borderRadius={8}
          backgroundColor={"#F4F4F4"}
          marginHorizontal={8 * 2}>
          <CardCash />
        </Column>
      </Column>
      <Column>
        <Row
          margin={8 * 2}
          justifyContent='space-between'>
          <Text weight='bold'>
            Ngày 19 tháng 12
          </Text>
          <Text>
            4 Giao dịch
          </Text>
        </Row>
        <Column
          borderRadius={8}
          backgroundColor={"#F4F4F4"}
          marginHorizontal={8 * 2}>
          <CardCash />
          <CardCash />
          <CardCash />
          <CardCash />
        </Column>
      </Column>
      <Column>
        <Row
          margin={8 * 2}
          justifyContent='space-between'>
          <Text weight='bold'>
            Ngày 21 tháng 12
          </Text>
          <Text>
            4 Giao dịch
          </Text>
        </Row>
        <Column
          borderRadius={8}
          backgroundColor={"#F4F4F4"}
          marginHorizontal={8 * 2}>
          <CardCash />
          <CardCash />
          <CardCash />
          <CardCash />
        </Column>
      </Column>
    </Column>
  )
}

export default HistoryCashOut

const styles = StyleSheet.create({})
