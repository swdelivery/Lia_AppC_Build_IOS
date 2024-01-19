import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import moment from 'moment'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'

const CardRefund = () => {
  return (
    <Row
      gap={8 * 2}
      borderRadius={8}
      backgroundColor={"#F3F4F9"}
      padding={8 * 2}>
      <Column gap={4} flex={1}>
        <Text
          color={GREY}
          fontStyle='italic'
          size={12}>{moment().format('HH:mm')}, {moment().format('DD/MM/YYYY')}</Text>
        <Text>
          Hoàn tiền thành công từ giao dịch M1
        </Text>
      </Column>
      <Column>
        <Text weight='bold' color={GREY_FOR_TITLE}>
          + {formatMonney(420000, true)}
        </Text>
      </Column>
    </Row>
  )
}

export default CardRefund

const styles = StyleSheet.create({})
