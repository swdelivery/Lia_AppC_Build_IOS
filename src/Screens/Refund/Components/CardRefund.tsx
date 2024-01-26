import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import { PaymentRequest } from '@typings/payment'
import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  data: PaymentRequest
}

const CardRefund = ({ data }: Props) => {

  const generateListServiceName = useMemo(() => {
    return data?.orders?.services?.map((item, index) => {
      if (index !== data?.orders?.services?.length - 1) {
        return `${item?.serviceName}, `
      } else {
        return `${item?.serviceName}.`
      }
    })
  }, [data?.orders])

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
          size={12}>{moment(data?.created).format('HH:mm')}, {moment(data?.created).format('DD/MM/YYYY')}</Text>
        <Text>
          Hoàn tiền thành công từ đơn hàng {generateListServiceName}
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
