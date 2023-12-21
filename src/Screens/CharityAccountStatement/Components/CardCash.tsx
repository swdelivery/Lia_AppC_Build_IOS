import Column from '@Components/Column'
import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREEN_SUCCESS, NEW_BASE_COLOR, RED } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { Transaction } from '@typings/charity'
import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

type Props = {
  data: Transaction
};

const CardCash = ({ data }: Props) => {
  const {
    status,
    partner,
    message,
    isHide,
    depositAmount,
    created
  } = data

  const isCashIn = useMemo(() => {
    if (status == 'INCREASE') {
      return true
    } else {
      return false
    }
  }, [status])

  return (
    <Column
      gap={8}
      padding={8 * 2}
      borderRadius={8}
      backgroundColor={"#F4F4F4"}>
      <Row gap={8}>
        <Text>
          {isCashIn ? 'Từ' : "Đến"}
        </Text>
        {
          isHide ?
            <Text numberOfLines={1} flex={1} weight='bold'>
              Ủng hộ ẩn danh
            </Text>
            :
            <Text numberOfLines={1} flex={1} weight='bold'>
              {partner?.name}
            </Text>
        }

        {
          isCashIn ?
            <Text
              color={GREEN_SUCCESS}
              weight='bold'>
              + {formatMonney(depositAmount, true)}
            </Text>
            :
            <Text
              color={RED}
              weight='bold'>
              - {formatMonney(depositAmount, true)}
            </Text>
        }

      </Row>
      <Row gap={8 * 2} alignItems='flex-end'>
        <Text style={styleElement.flex} size={12}>
          {message}
        </Text>
        <Row gap={4}>
          <Text size={12}>
            {moment(created).format('HH:MM')}
          </Text>
        </Row>
      </Row>
    </Column>
  )
}

export default CardCash

const styles = StyleSheet.create({})
