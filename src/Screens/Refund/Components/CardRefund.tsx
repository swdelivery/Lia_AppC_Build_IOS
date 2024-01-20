import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import { PaymentRequest } from '@typings/payment'
import moment from 'moment'
import React from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  data: PaymentRequest
}

const CardRefund = ({ data }: Props) => {
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
          Hoàn tiền thành công
        </Text>
      </Column>
      <Column>
        <Text weight='bold' color={GREY_FOR_TITLE}>
          + {formatMonney(data?.amount, true)}
        </Text>
      </Column>
    </Row>
  )
}

export default CardRefund
